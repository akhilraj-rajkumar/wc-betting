export class UserModel {
  firstName: string;
  lastName: string;
  token: string;

  desrialisze(input): UserModel {
    this.firstName = input.firstName;
    return this;
  }

  isLoggedIn(): Boolean {
      return false;
  }
}
