interface IFancyError {
  message: string
  status: number
  stack: any
}

export class FancyError extends Error {
  public status: number

  constructor(message?: string, status?: number, name?: string) {
    super(message)
    this.name = name || 'FancyError'
    this.status = status || 500
  }
}
