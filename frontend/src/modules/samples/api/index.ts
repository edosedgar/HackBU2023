import axios from "axios";

export default {
  getSamples: () =>
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL_SAMPLES}?ts=${Date.now()}`,
    }),
};
