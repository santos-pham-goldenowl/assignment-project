import httpLayer from "../httpLayer";

class UserAction {
  constructor() {
    const token = localStorage.getItem("token");
    this.headers = {
      Authentication: token || "",
    };
  }

  async login(values) {
    return await httpLayer.post("/api/login", values);
  }

  signup(values) {
    return httpLayer.post("/api/signup", values);
  }
}

export default new UserAction();
