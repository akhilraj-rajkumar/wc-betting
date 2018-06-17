export class UserProgressModel {
    match: number;
    netPoint = 0;

    deserialize(input): UserProgressModel {
        this.match = input['match_id'];
        this.netPoint = input['net_point'];
        return this;
    }
}
