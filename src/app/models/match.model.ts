import { TeamModel } from './team.model';
import { VenueModel } from './venue.model';

export class MatchModel {
    id: number;
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
    resultLost: any = null;
    resultTeamId = 0;

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
        if (this.result !== null) {
             return this.result;
        } else {
            return '-';
        }
    }

    getLosePoints() {
        if (this.resultLost !== null) {
            return this.resultLost;
        } else {
            return '-';
        }
    }
    getProfiltOrLosePoints() {
        if (this.result !== null && this.resultLost !== null) {
            return this.result - this.resultLost;
        } else {
            return '-';
        }
    }

    getProfiltOrLoseTooltip() {
        if (this.result !== null && this.resultLost !== null) {
            const profit = this.result - this.resultLost;
            if (profit > 0) {
                return 'Your total profit on this match is ' + profit.toFixed(2) + ' point(s)';
            } else if (profit < 0) {
                return 'Your total loss on this match is ' + profit.toFixed(2) + ' point(s)';
            } else {
                return 'You have no profit or loss';
            }
        } else {
            return 'Result not published';
        }
    }

    getWinToolTip() {
        if (this.result !== null) {
             return 'You won ' + this.result.toFixed(2) + ' potint(s)';
        } else {
            return 'Result not published';
        }
    }

    getLoseToolTip() {
        if (this.resultLost !== null) {
             return 'You lost ' + this.resultLost.toFixed(2) + ' potint(s)';
        } else {
            return 'Result not published';
        }
    }

    getTotalPointTootlTip() {
        return 'You added ' + this.totalBets() + ' points(s)'
    }

    canBet() {
        if (this.homeTeam.id == 1 || this.awayTeam.id == 1) {
            return false;
        }
        return true;
    }
}
