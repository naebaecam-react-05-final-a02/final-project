import ReviewAPI from '@/service/review.service';
import AuthAPI from './auth.service';
import ChallengeAPI from './challenge.service';
import CommunityAPI from './community.service';
import DashBoardAPI from './dashboard.service';
import DietAPI from './diet.service';
import ExerciseAPI from './exercise.service';
import ImageAPI from './image.service';
import LevelAPI from './level.service';
import NotificationsAPI from './notifications.service';
import UsersAPI from './users.service';

class API {
  auth: AuthAPI;
  challenge: ChallengeAPI;
  review: ReviewAPI;
  image: ImageAPI;
  diet: DietAPI;
  exercise: ExerciseAPI;
  users: UsersAPI;
  dashboard: DashBoardAPI;
  notifications: NotificationsAPI;
  community: CommunityAPI;
  level: LevelAPI;

  constructor() {
    this.auth = new AuthAPI();
    this.challenge = new ChallengeAPI();
    this.review = new ReviewAPI();
    this.image = new ImageAPI();
    this.diet = new DietAPI();
    this.exercise = new ExerciseAPI();
    this.users = new UsersAPI();
    this.dashboard = new DashBoardAPI();
    this.notifications = new NotificationsAPI();
    this.community = new CommunityAPI();
    this.level = new LevelAPI();
  }
}

const api = new API();

export default api;
