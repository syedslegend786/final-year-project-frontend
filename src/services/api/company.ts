import httpCommon from "../httpCommon";

export const becomeCompanyApi = async () => {
  return httpCommon.post("/make-instructor", {});
};


export const updateCompanyProfileApi = async (data: any) => {
  return httpCommon.post("/update/company/profile", data)
}