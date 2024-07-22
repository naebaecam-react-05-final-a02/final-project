import AuthAPI from './auth.service';
import ChallengeAPI from './challenge.service';
import DashBoardAPI from './dashboard.service';

class API {
  auth: AuthAPI;
  dashboard: DashBoardAPI;
  challenge: ChallengeAPI;

  constructor() {
    this.auth = new AuthAPI();
    this.dashboard = new DashBoardAPI();
    this.challenge = new ChallengeAPI();
  }
}

const api = new API();

export default api;
