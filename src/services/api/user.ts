import httpCommon from "../httpCommon";

type Login = {
  username: string;
  password: string;
};
export const loginApi = async (data: Login) => {
  return httpCommon.post("/login", data);
};

type Register = {
  username: string;
  password: string;
};

export const registerApi = async (data: Register) => {
  return httpCommon.post("/register", data);
};

export const getUserApi = async () => {
  return httpCommon.get("/get-user");
};

export const logoutApi = async () => {
  return httpCommon.post("/logout", {});
};
