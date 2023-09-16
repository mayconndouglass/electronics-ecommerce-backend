export class ExclusiveFieldError extends Error {
  constructor() {
    super("Send only one of the fields: promotionalPrice or discount.")
  }
}
