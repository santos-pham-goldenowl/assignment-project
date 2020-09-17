import Axios from "axios";
const DOMAIN = process.env.REACT_APP_DOMAIN;
class HTTPLayer {
  get(url, options) {
    const apiUrl = this.prepareUrl(url);
    return Axios.get(apiUrl, options);
  }

  post(url, values = "") {
    const apiUrl = this.prepareUrl(url);
    return Axios.post(apiUrl, values);
  }

  prepareUrl(url) {
    if (url.includes("http")) {
      return url;
    }

    return `${DOMAIN}${url}`;
  }
}

export default new HTTPLayer();
