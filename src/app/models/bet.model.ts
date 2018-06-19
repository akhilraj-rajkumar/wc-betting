export class BetModel {
    homeBets = 0;
    awayBets = 0;
    drawBets = 0;
    matchId: number;
    homeBetUsers = [];
    awayBetUsers = [];
    drawBetUsers = [];

    deserialize(input): BetModel {
        this.homeBets = input['home']['total_bids'];
        this.awayBets = input['away']['total_bids'];
        this.drawBets = input['draw']['total_bids'];
        this.matchId = input['match']['id'];
        this.homeBetUsers = input['home']['user_bids'];
        this.awayBetUsers = input['away']['user_bids'];
        this.drawBetUsers = input['draw']['user_bids'];
        return this;
    }

    totalBets() {
        return this.homeBets + this.awayBets + this.drawBets;
    }

    actualHomeBetUsers() {
        const filtered = this.homeBetUsers.filter( item => item.number_of_bids > 0);
        return filtered;
    }

    actualAwayBetUsers() {
        const filtered = this.awayBetUsers.filter( item => item.number_of_bids > 0);
        return filtered;
    }

    actualDrawBetUsers() {
        const filtered = this.drawBetUsers.filter( item => item.number_of_bids > 0);
        return filtered;
    }
}
