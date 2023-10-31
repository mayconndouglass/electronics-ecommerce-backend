export class UserAlreadyHasAnOpenCartError extends Error {
  constructor() {
    super("User Already Has An Open Cart.")
  }
}
