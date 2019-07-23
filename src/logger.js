const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: process.env.LOG_LEVEL,
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    format.splat(),
    format.colorize(),
    format.printf(
      ({ level, message, label, timestamp }) =>
        `${timestamp} ${label || "-"} ${level}: ${message}`
    )
  )
});

if (process.env.NODE_ENV === "PROD") {
  // Google App Engine
  // Imports the Google Cloud client library for Winston
  const { LoggingWinston } = require("@google-cloud/logging-winston");
  const loggingWinston = new LoggingWinston();
  logger.add(loggingWinston);
} else {
  // Now Zeit
  logger.add(new transports.Console());
}

module.exports = logger;
