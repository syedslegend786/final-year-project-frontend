import httpCommon from "../httpCommon";

export const verifyPaymentApi = async (
  cid: string,
  startDate: string,
  endDate: string
) => {
  return httpCommon.get(
    `/verify-payment/${cid}?start_date=${startDate}&&end_date=${endDate}`
  );
};
