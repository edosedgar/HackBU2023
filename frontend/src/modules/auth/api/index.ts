import axios from "axios";

export type RegisterData = {
  username: string;
  password: string;
  name: string;
  middle_name: string;
  surname: string;
};

type LoginData = {
  username: string;
  password: string;
};

export default {
  register: (data: RegisterData) =>
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL_REGISTER,
      data,
    }),
  login: (data: LoginData) =>
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL_LOGIN,
      data,
    }),
};
