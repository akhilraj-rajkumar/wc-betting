export class UserModel {
  firstName: string;
  lastName: string;
  token: string;

  desrialisze(input): UserModel {
    this.firstName = input.firstName;
    this.token = input.token;
    return this;
  }

  isLoggedIn(): Boolean {
      return (this.token && this.token.length > 0);
  }
}
