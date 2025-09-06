// src/utils/logger.js
const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4
};

// Nível padrão baseado em ambiente
const defaultLevel = process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG;

class Logger {
  constructor(level = defaultLevel) {
    this.level = level;
  }

  debug(...args) {
    if (this.level <= LogLevel.DEBUG) {
      console.debug('[DEBUG]', ...args);
    }
  }

  info(...args) {
    if (this.level <= LogLevel.INFO) {
      console.info('[INFO]', ...args);
    }
  }

  warn(...args) {
    if (this.level <= LogLevel.WARN) {
      console.warn('[WARN]', ...args);
    }
  }

  error(...args) {
    if (this.level <= LogLevel.ERROR) {
      console.error('[ERROR]', ...args);
    }
  }

  setLevel(level) {
    this.level = level;
  }
}

// Criar instância global
const logger = new Logger();

export { logger, LogLevel };