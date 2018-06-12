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
    result: any = null;

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

    clearBets() {
        this.homeTeamBets = 0;
        this.awayTemaBets = 0;
        this.drawBets = 0;
    }

    getWinPoints() {
        if (this.result) {
            if (this.result > 0) {
                return this.result;
            } else {
                return 0;
            }
        } else {
            return '-';
        }
    }

    getLosePoints() {
        if (this.result) {
            if (this.result < 0) {
                return this.result;
            } else {
                return 0;
            }
        } else {
            return '-';
        }
    }

    getWinToolTip() {
        if (this.result) {
            if (this.result > 0) {
                return 'You won ' + this.result + ' potint(s)';
            } else {
                return 'You won 0 points';
            }
        } else {
            return 'Result not published';
        }
    }

    getLoseToolTip() {
        if (this.result) {
            if (this.result < 0) {
                return 'You lose ' + this.result + ' potint(s)';
            } else {
                return 'You lose 0 points';
            }
        } else {
            return 'Result not published';
        }
    }
}