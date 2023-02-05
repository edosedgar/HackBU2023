/* eslint-disable */
import { FC, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const GlobalFunctionality: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || "";

    axios.interceptors.request.use(
      (config) => {
        if (
          // don't add the token to auth requests
          config.url &&
          ![
            // todo
            "/admin/registration",
            "/user/registration",
            "/auth/getToken",
          ].includes(config.url)
        ) {
          // add token to all api calls if token exists
          const token = localStorage.getItem("token");
          if (token && config.headers)
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // if any api call says 401 Unauthorized, then drop the token and redirect to the login page
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          if (!["/auth/login", "/auth/register"].includes(location.pathname))
            navigate("/auth/login");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (
  //     !token &&
  //     !["/auth/login", "/auth/register"].includes(location.pathname)
  //   ) {
  //     navigate("/auth/login", { replace: true });
  //   } else if (
  //     token &&
  //     ["/auth/login", "/auth/register"].includes(location.pathname)
  //   ) {
  //     navigate("/", { replace: true });
  //   }
  // }, [location.pathname, navigate]);

  return null;
};

export default GlobalFunctionality;
