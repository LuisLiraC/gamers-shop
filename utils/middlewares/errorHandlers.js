const config = require('../../config')
const Sentry = require('@sentry/node')
const boom = require('@hapi/boom')
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi')

function withErrorStack(err, stack) {
  if(config.dev) {
    return{ ...err, stack }
  }
}

Sentry.init({ dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}`})

function logErrors(err, req, res, next) {
  Sentry.captureException(err)
  next(err)
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    return next(boom.badImplementation(err))
  }

  return next(err)
}

function clientErrorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err

  if (isRequestAjaxOrApi(req) || res.headersSent) {
    return res.status(statusCode).json(withErrorStack(payload, err.stack))
  } else {
    return next(err)
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err

  return res.status(statusCode).render("error", withErrorStack(payload, err.stack))
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler,
  wrapErrors
}