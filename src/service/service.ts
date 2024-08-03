import ReviewAPI from '@/service/review.service';
import AuthAPI from './auth.service';
import ChallengeAPI from './challenge.service';
import DashBoardAPI from './dashboard.service';
import DietAPI from './diet.service';
import ExerciseAPI from './exercise.service';
import ImageAPI from './image.service';
import UsersAPI from './users.service';

class API {
  auth: AuthAPI;
  challenge: ChallengeAPI;
  review: ReviewAPI;
  image: ImageAPI;
  diet: DietAPI;
  users: UsersAPI;
  exercise: ExerciseAPI;

  dashboard: DashBoardAPI;

  constructor() {
    this.auth = new AuthAPI();
    this.challenge = new ChallengeAPI();
    this.review = new ReviewAPI();
    this.image = new ImageAPI();
    this.diet = new DietAPI();
    this.users = new UsersAPI();

    this.exercise = new ExerciseAPI();
    this.dashboard = new DashBoardAPI();
  }
}

const api = new API();

export default api;
