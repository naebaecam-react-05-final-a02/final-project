import AuthAPI from './auth.service';
import DashBoardAPI from './dashboard.service';

class API {
  auth: AuthAPI;
  dashboard: DashBoardAPI;

  constructor() {
    this.auth = new AuthAPI();
    this.dashboard = new DashBoardAPI();
  }
}

const api = new API();

export default api;
