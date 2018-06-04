export class UserModel {
  firstName: string;
  lastName: string;
  token: string;

  isLoggedIn(): Boolean {
      return false;
  }
}
