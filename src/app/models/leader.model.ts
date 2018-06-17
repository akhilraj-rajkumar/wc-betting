export class LeaderModel {
    username: string;
    firstName: string;
    lastName: string;
    name: string;
    avgPoints = 0;
    totalPoints = 0;

    deserialize(input): LeaderModel {
        this.username = input['username'];
        this.firstName = input['first_name'];
        this.lastName = input['last_name'];
        this.name = this.firstName + ' ' + this.lastName;
        this.avgPoints = input['avg_points_gained'];
        this.totalPoints = input['total_points_gained'];
        return this;
    }
}
