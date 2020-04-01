export class FancyError extends Error {
  public status: number

  constructor(message?: string, status?: number, err?: Error) {
    super(message)
    this.name = err ? err.name : 'Error'
    this.status = status || 500
    this.stack = err ? err.stack : ''
  }
}
