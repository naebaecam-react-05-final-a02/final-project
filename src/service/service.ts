import AuthAPI from './auth.service';
import UsersAPI from './users.service';

class API {
  auth: AuthAPI;
  users: UsersAPI;

  constructor() {
    this.auth = new AuthAPI();
    this.users = new UsersAPI();
  }
}

const api = new API();

export default api;
