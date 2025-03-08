import { register } from "fetch-intercept";
import { useAppStore } from "./app";

register({
  response: (response) => {
    if (response.status === 401) {
      const { logout } = useAppStore();
      logout();
    }

    const newToken = response.headers.get("Renew-Authorization");
    if (newToken) {
      const { renewToken } = useAppStore();
      renewToken(newToken);
    }

    return response;
  },
  responseError: (error) => {
    return Promise.reject(error);
  },
});

//const baseUrl = "http://localhost:3003";
const baseUrl = "http://192.168.1.53:3003";

const getRequestInit = (
  init = {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  }
) => {
  const { token } = useAppStore();
  if (token) {
    init.headers["Authorization"] = `Bearer ${token}`;
  }
  return init;
};

export { baseUrl, getRequestInit };
