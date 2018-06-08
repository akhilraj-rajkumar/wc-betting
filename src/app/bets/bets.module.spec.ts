import { BetsModule } from './bets.module';

describe('BetsModule', () => {
  let betsModule: BetsModule;

  beforeEach(() => {
    betsModule = new BetsModule();
  });

  it('should create an instance', () => {
    expect(betsModule).toBeTruthy();
  });
});
