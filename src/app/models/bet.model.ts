export class BetModel {
    homeBets = 0;
    awayBets = 0;
    drawBets = 0;
    matchId: number;

    deserialize(input): BetModel {
        this.homeBets = input['home']['total_bids'];
        this.awayBets = input['away']['total_bids'];
        this.drawBets = input['draw']['total_bids'];
        this.matchId = input['match']['id'];
        return this;
    }

    totalBets() {
        return this.homeBets + this.awayBets + this.drawBets;
    }
}
