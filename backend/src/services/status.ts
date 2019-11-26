export class Status {
  private message: string

  constructor(message: string) {
    this.message = message
  }

  complete() {
    return {
      status: this.message,
    }
  }

  fail() {
    return {
      status: this.message,
    }
  }
}
