import httpCommon from "../httpCommon";

export const becomeCompanyApi = async () => {
  return httpCommon.post("/make-instructor", {});
};
