import httpCommon from "../httpCommon";

type Login = {
  username: string;
  password: string;
};
export const loginApi = async (data: any) => {
  return httpCommon.post("/login", data);
};

export const registerApi = async (data: any) => {
  return httpCommon.post("/register", data);
};

export const getUserApi = async () => {
  return httpCommon.get("/get-user");
};

export const logoutApi = async () => {
  return httpCommon.post("/logout", {});
};


export const verifyOTPApi = async (data: any) => {
  return httpCommon.post("/verify-otp", data)
}

export const resetPasswordToken = async (data: any) => {
  return httpCommon.post("/reset-password", data)
}

export const forgetPasswordApi = async (data: any) => {
  return httpCommon.post("/forget-password", data)
}