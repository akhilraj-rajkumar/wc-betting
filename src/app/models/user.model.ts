export class UserModel {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  fullName: string;
  points: number;

  desrialisze(input): UserModel {
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.fullName = this.firstName + ' ' + this.lastName;
    this.email = input.email;
    this.token = input.token;
    this.points = input.points;
    return this;
  }

  deserializeData(data): UserModel {
    this.firstName = data['first_name'];
    this.lastName = data['last_name'];
    this.fullName = this.firstName + ' ' + this.lastName;
    this.token = data['token'];
    this.email = data['email'];
    this.points = data['points'];
    return this;
  }

  isLoggedIn(): Boolean {
      return (this.token && this.token.length > 0);
  }
}
