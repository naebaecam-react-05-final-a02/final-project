import AuthAPI from './auth.service';
import ChallengeAPI from './challenge.service';
import DashBoardAPI from './dashboard.service';
import DietAPI from './diet.service';
import ImageAPI from './image.service';
import ReviewAPI from '@/service/review.service';

class API {
  auth: AuthAPI;
  dashboard: DashBoardAPI;
  challenge: ChallengeAPI;
  review: ReviewAPI;
  image: ImageAPI;
  diet: DietAPI;

  constructor() {
    this.auth = new AuthAPI();
    this.dashboard = new DashBoardAPI();
    this.challenge = new ChallengeAPI();
    this.review = new ReviewAPI();
    this.image = new ImageAPI();
    this.diet = new DietAPI();
  }
}

const api = new API();

export default api;
