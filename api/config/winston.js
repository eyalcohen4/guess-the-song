import winston from 'winston';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      json: false,
      colorize: true
    }),
	new (winston.transports.File)({
      filename: 'debug.log',
      handleExceptions: true,
      humanReadableUnhandledException: true,
	  json: false,
	  exitOnError: false
    })
  ]
});

export default logger;
