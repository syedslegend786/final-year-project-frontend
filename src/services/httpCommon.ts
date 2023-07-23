import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

interface Config extends AxiosRequestConfig {}

const BASE = "http://localhost:5000";

axios.defaults.baseURL = BASE;
let token = null;
if (typeof window !== "undefined") {
  // Perform localStorage action
  token = localStorage.getItem("token");
}
axios.defaults.headers.Authorization = token;
axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return Promise.resolve(config);
  },
  (err) => {
    return Promise.reject(err);
  }
);

const get = (url: string, config: Config = {}): Promise<AxiosResponse> =>
  axios.get(url, config);

const post = (
  url: string,
  data: any,
  config: Config = {}
): Promise<AxiosResponse> => axios.post(url, data, config);

const put = (
  url: string,
  data: any,
  config: Config = {}
): Promise<AxiosResponse> => axios.put(url, data, config);

const patch = (
  url: string,
  data: any,
  config: Config = {}
): Promise<AxiosResponse> => axios.patch(url, data, config);

const del = (url: string, config: Config = {}): Promise<AxiosResponse> =>
  axios.delete(url, config);

export default {
  get,
  post,
  put,
  patch,
  del,
};
