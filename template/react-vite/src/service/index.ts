import axios from "axios";
import Exception from "./exception";

const __DEV_SERVER__ = "https://dev-activity.iambanban.com"; // 国内测试域名
const __ALPHA_SERVER__ = "https://alpha.yinjietd.com"; // 国内alpha
const __PRODUCT_SERVER__ = "https://api.yinjietd.com/_activity"; // 伴伴国内

const __SERVER__: Record<string, string> = {
  local: "http://121.40.181.12:3000/mock/24",
  development: __DEV_SERVER__,
  alpha: __ALPHA_SERVER__,
  production: __PRODUCT_SERVER__,
};


function getServer(key = "production") {
  return __SERVER__[key];
}

let _lan = "en";
const query = window.location.search.replace(/^\?/, "").split("&");
query.map((q) => {
  if (/^lan=/.test(q)) {
    _lan = q.split("=")[1];
  }
});
const instance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    "Accept-Language": "*",
    "user-language": _lan,
  },
});

instance.interceptors.request.use((res: any) => {
  const domain = getServer(localStorage.getItem("server_env") || "production");
  res.baseURL = domain;
  res.headers.common["user-token"] = localStorage.getItem("token");
  res.headers.common["language"] = localStorage.getItem("lan");
  return res;
});

function get(url: string, params: Record<string, any>) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, { params })
      .then((response: any) => {
        if (response.common && response.common.err_code) {
          const exp = new Exception(response);
          const error = exp.getInstance();
          reject(error);
        } else {
          resolve(response.data);
        }
      })
      .catch((err) => {
        console.log("error", url, err);
        const error = {
          msg: window._lang.party_star_network_connection_timed_out,
        };
        reject(error);
      });
  });
}

function post(url: string, header: Record<string, any>, data: Record<string, any>, forceCheck = false) {
  if (!data) {
    data = header;
    header = {};
  }

  console.log("instance");
  console.log(instance);
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then((response: any) => {
        if (response.common && response.common.err_code) {
          const exp = new Exception(response);
          const error = exp.getInstance();
          reject(error);
        } else {
          console.log("response", response);
          resolve(response.data);
        }
        // if ((!response.data || !response.data.success) && !forceCheck) {
        //   const exp = new Exception(response);
        //   const error = exp.getInstance(response.data);
        //   reject(error);
        // } else {
        //   resolve(response.data);
        // }
      })
      .catch((err) => {
        console.log("error", url, err);
        const error = {
          msg: window._lang.party_star_network_connection_timed_out,
        };
        reject(error);
      });
  });
}

export default {
  get,
  post,
};