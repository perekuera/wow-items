import { useAppStore } from "./app";

const baseUrl = "http://localhost:3003";

const getRequestInit = (
  init = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }
) => {
  const { token } = useAppStore();
  if (token) {
    init.headers["Authorization"] = `Bearer ${token}`;
  }
  return init;
};

export { baseUrl, getRequestInit };
