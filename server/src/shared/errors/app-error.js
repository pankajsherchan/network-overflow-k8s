export class AppError extends Error {
  name;
  description;
  httpCode;

  constructor(name, description, httpCode) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = name;
    this.description = description;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}
