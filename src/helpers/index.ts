export class FancyError extends Error {
  public status: number

  constructor(err: Error, message?: string, status?: number) {
    super(message)
    this.name = err.name || 'FancyError'
    this.status = status || 500
    this.stack = err.stack || ''
  }
}
