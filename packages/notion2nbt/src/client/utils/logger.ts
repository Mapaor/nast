/**
 * Logging utility for Notion2NBT client
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export class Logger {
  private level: LogLevel

  constructor(level: LogLevel = 'warn') {
    this.level = level
  }

  public setLevel(level: LogLevel): void {
    this.level = level
  }

  public getLevel(): LogLevel {
    return this.level
  }

  public log(level: LogLevel, message: string): void {
    const levels: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 }
    if (levels[level] >= levels[this.level]) {
      console[level](`[notion2nbt] ${message}`)
    }
  }

  public debug(message: string): void {
    this.log('debug', message)
  }

  public info(message: string): void {
    this.log('info', message)
  }

  public warn(message: string): void {
    this.log('warn', message)
  }

  public error(message: string): void {
    this.log('error', message)
  }
}
