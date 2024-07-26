import ReviewAPI from '@/service/review.service';
import AuthAPI from './auth.service';
import ChallengeAPI from './challenge.service';
import DietAPI from './diet.service';
import ImageAPI from './image.service';
import UsersAPI from './users.service';

class API {
  auth: AuthAPI;
  challenge: ChallengeAPI;
  review: ReviewAPI;
  image: ImageAPI;
  diet: DietAPI;
  users: UsersAPI;

  constructor() {
    this.auth = new AuthAPI();
    this.challenge = new ChallengeAPI();
    this.review = new ReviewAPI();
    this.image = new ImageAPI();
    this.diet = new DietAPI();
    this.users = new UsersAPI();
  }
}

const api = new API();

export default api;
