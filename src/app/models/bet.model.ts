export class BetModel {
    homeBets: number = 0;
    awayBets: number = 0;
    drawBets: number = 0;
    matchId: number;

    deserialize(input): BetModel {
        this.homeBets = input['home']['number_of_bids'];
        this.awayBets = input['away']['number_of_bids'];
        this.drawBets = input['draw']['number_of_bids'];
        this.matchId = input['match']['id'];
        return this;
    }

    totalBets() {
        return this.homeBets + this.awayBets + this.drawBets;
    }
}
