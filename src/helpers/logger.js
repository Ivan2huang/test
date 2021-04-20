/* eslint-disable prefer-destructuring */
/* istanbul ignore file */
const Sentry = require('@sentry/node');

const config = require('next/config').default();

const isServer = () => !(typeof window !== 'undefined' && window.document);

const localeStringOptions = {
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: '2-digit',
  month: '2-digit',
};

let LOG_LEVEL;
let SENTRY_DSN;
let SENTRY_ENV;

if (isServer()) {
  LOG_LEVEL = process.env.LOG_LEVEL;
  SENTRY_DSN = process.env.SENTRY_DSN;
  SENTRY_ENV = process.env.SENTRY_ENV;
} else {
  const {
    publicRuntimeConfig: { logLevel, sentryDSN, sentryENV },
  } = config;
  LOG_LEVEL = logLevel;
  SENTRY_DSN = sentryDSN;
  SENTRY_ENV = sentryENV;
}

Sentry.init({
  dsn: SENTRY_DSN,
  environment: SENTRY_ENV,
  maxValueLength: 10000,
});

const IS_DEBUG = LOG_LEVEL === 'debug';

class LoggerService {
  constructor(level = 'info') {
    this.level = level;
  }

  // eslint-disable-next-line class-methods-use-this
  format(errContext) {
    if (errContext instanceof Error) {
      return {
        name: errContext.name,
        message: errContext.message,
        stack: errContext.stack,
      };
    }
    return typeof errContext === 'object' ? errContext : { detail: errContext };
  }

  error(message, context = null) {
    this.write('error', message, context);
  }

  log(message, context = null) {
    this.write('info', message, context);
  }

  write(level, message, context = null) {
    const timestamp = new Date(Date.now()).toLocaleString(
      undefined,
      localeStringOptions,
    );

    const log = {
      level,
      time: timestamp,
      context: this.format(context),
    };

    const dataStr = JSON.stringify({ ...log, message });
    const sentryCapture = () => {
      if (level === 'error') {
        Sentry.captureException(new Error(dataStr));
      } else {
        Sentry.captureMessage(dataStr);
      }
    };

    if (level === 'error' || IS_DEBUG) {
      // eslint-disable-next-line no-console
      console.log(dataStr);
      sentryCapture();
    }
  }
}

const logger = new LoggerService();

module.exports = logger;
