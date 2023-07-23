export const URLS = {
  HOME: "/",
  VEHICLES: "/vehicles",
  VEHICLE_DETAIL: (vid: string) => `/vehicles/${vid}`,
  COMPANY_DASHBOARD: "/dashboard",
  ADD_CAR: "/add-vehicle",
  BECOME_PARTNER: "/company/become-partner",
  LOGIN: "/login",
  REGISTER: "/register",
  ORDERS: "/orders",
  TRANSACTION_HISTORY: "/transaction-history",
  UPDATE_CAR: (cid: string) => `/car/update/${cid}`,
};
