import { createLogger, format, transports } from 'winston'
const { timestamp, printf, errors, colorize } = format

// Define los niveles de logging
const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

// Colores opcionales para diferentes niveles (si se usa colorize)
const colors = {
  debug: 'blue',
  http: 'magenta',
  info: 'green',
  warning: 'yellow',
  error: 'red',
  fatal: 'bold red'
};

// Formato de los logs
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Logger para desarrollo
const devLogger = createLogger({
  levels,
  format:(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console({
      level: 'debug',
    }),
  ],
});

// Logger para producción
const prodLogger = createLogger({
  levels,
  format: (
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console({
      level: 'info',
    }),
    new transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ],
});

// Seleccionar logger basado en el entorno
const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export default logger;