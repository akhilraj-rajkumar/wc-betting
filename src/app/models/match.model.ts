import { TeamModel } from './team.model';
import { VenueModel } from './venue.model';

export class MatchModel {
    id: string;
    matchNumber: string;
    round: string;
    group: string;
    date: string;
    homeTeam: TeamModel;
    awayTeam: TeamModel;
    venue: VenueModel;
    homeTeamBets: number = 0;
    awayTemaBets: number = 0;
    drawBets: number = 0;

    deserialize(input): MatchModel {
        this.id = input.id;
        this.matchNumber = input.match_number;
        this.round = input.round;
        this.group = input.group;
        this.date = input.date;
        this.homeTeam = new TeamModel().deserialize(input.home_team);
        this.awayTeam = new TeamModel().deserialize(input.away_team);
        this.venue = new VenueModel().deserialize(input.venue);
        return this;
    }

    totalBets(): number {
        return this.homeTeamBets + this.awayTemaBets + this.drawBets;
    }

    updatePointsFromCopy(copy: MatchModel) {
        this.homeTeamBets = copy.homeTeamBets;
        this.awayTemaBets = copy.awayTemaBets;
        this.drawBets = copy.drawBets;
    }
}