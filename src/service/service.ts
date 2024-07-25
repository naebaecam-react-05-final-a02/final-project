import AuthAPI from './auth.service';
import ChallengeAPI from './challenge.service';
import DashBoardAPI from './dashboard.service';
import DietAPI from './diet.service';
import ImageAPI from './image.service';
import UsersAPI from './users.service';

class API {
  auth: AuthAPI;
  dashboard: DashBoardAPI;
  challenge: ChallengeAPI;
  image: ImageAPI;
  diet: DietAPI;
  users: UsersAPI;

  constructor() {
    this.auth = new AuthAPI();
    this.dashboard = new DashBoardAPI();
    this.challenge = new ChallengeAPI();
    this.image = new ImageAPI();
    this.diet = new DietAPI();
    this.users = new UsersAPI();
  }
}

const api = new API();

export default api;
