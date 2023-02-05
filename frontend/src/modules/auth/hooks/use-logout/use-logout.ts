import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logoutFn = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return {
    logout: logoutFn,
  };
};

export { useLogout };
