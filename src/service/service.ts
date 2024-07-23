import AuthAPI from './auth.service';
import ChallengeAPI from './challenge.service';
import DashBoardAPI from './dashboard.service';
import ImageAPI from './image.service';

class API {
  auth: AuthAPI;
  dashboard: DashBoardAPI;
  challenge: ChallengeAPI;
  image: ImageAPI;

  constructor() {
    this.auth = new AuthAPI();
    this.dashboard = new DashBoardAPI();
    this.challenge = new ChallengeAPI();
    this.image = new ImageAPI();
  }
}

const api = new API();

export default api;
