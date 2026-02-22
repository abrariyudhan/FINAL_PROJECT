export class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequest extends CustomError {
  constructor(message) {
    super(message, 400)
  }
}

export class Unauthorized extends CustomError {
  constructor(message) {
    super(message, 401)
  }
}

export class NotFound extends CustomError {
  constructor(message) {
    super(message, 404)
  }
}