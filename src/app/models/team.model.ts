export class TeamModel {
    id: string;
    name: string;
    shortName: string;
    color: string;
    logo: string;

    deserialize(input): TeamModel {
        this.id = input.id;
        this.name = input.team_name;
        this.shortName = input.team_abb;
        this.color = input.representation_color;
        this.logo = input.team_logo;
        return this;
    }

    logouUrl() {
        return 'http://localhost:8000/' + this.logo;
    }
}
