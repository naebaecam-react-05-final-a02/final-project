import AuthAPI from './auth.service';
import DietAPI from './diet.service';

class API {
  auth: AuthAPI;
  diet: DietAPI;

  constructor() {
    this.auth = new AuthAPI();
    this.diet = new DietAPI();
  }
}

const api = new API();

export default api;
