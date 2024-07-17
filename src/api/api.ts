import AuthAPI from './auth/auth.api';

class API {
  auth: AuthAPI;

  constructor() {
    this.auth = new AuthAPI();
  }
}

const api = new API();

export default api;
