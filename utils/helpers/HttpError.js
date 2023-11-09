class HttpError extends Error {
  constructor({
    message = "Something went wrong",
    statusCode = 500,
    result
  }) {
    super(message);
    this.statusCode = statusCode;
    this.result = result;
  }
}

module.exports = HttpError;