import axios from 'axios';
import { isInApp } from '@/native/native';
import Exception from './exception';
import Native from '@/native';

const PS_LOCAL_SERVER = 'http://47.96.23.201';
const PS_DEV_SERVER = 'http://47.96.23.201'; // ps测试域名
const PS_ALPHA_SERVER = 'https://api.starcloud.rocks'; // ps alpha
const PS_PRODUCT_SERVER = 'https://api.starcloud.rocks'; // ps 线上

const __SERVER__: Record<string, string> = {
  local: PS_LOCAL_SERVER,
  development: PS_DEV_SERVER,
  alpha: PS_ALPHA_SERVER,
  production: PS_PRODUCT_SERVER,
};

async function getSign() {
  const _data: any = await Native.NativeGetSign(() => {});
  const {
    _ipv,
    _platform,
    _index,
    package: pkg,
    _model,
    _timestamp,
    _abi,
    _blid,
    _sign,
  } = _data.data;
  const query = {
    package: pkg,
    _ipv,
    _platform,
    _index,
    _model,
    _timestamp,
    _abi,
    _blid: _blid || '',
    _sign,
  };

  const arr = [];
  for (const key in query) {
    arr.push(`${key}=${query[key as keyof typeof query]}`);
  }

  return arr.join('&');
}

function getServer() {
  let key = 'production';
  if (isInApp) {
    key = localStorage.getItem('server_env') || 'production';
  } else {
    const DEV_HOST = '47.96.23.201';
    const DEV_HOST2 = 'partystar-dev.iambanban.com';
    const ALPHA_PORT = ':8086';
    key =
      window.location.href.includes(DEV_HOST) ||
      window.location.href.includes(DEV_HOST2)
        ? 'development'
        : key;
    key = window.location.href.includes(ALPHA_PORT) ? 'alpha' : key;
  }
  key = import.meta.env.DEV ? 'local' : key;
  return __SERVER__[key];
}

let _lan = 'en';
const query = window.location.search.replace(/^\?/, '').split('&');
query.map((q) => {
  if (/^lan=/.test(q)) {
    _lan = q.split('=')[1];
  }
});
const instance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    'Accept-Language': '*',
    'user-language': _lan,
  },
});

instance.interceptors.request.use((res: any) => {
  const domain = getServer();
  res.baseURL = domain;
  res.headers.common['user-token'] = localStorage.getItem('user-token');
  res.headers.common['language'] = localStorage.getItem('lan');
  return res;
});

async function get<T>(url: string, params: Record<string, any>): Promise<T> {
  if (isInApp) {
    const query = await getSign();
    url = url.includes('?') ? `${url}&${query}` : `${url}?${query}`;
  }

  try {
    const response: any = await instance.get(url, { params });
    if (response.common && response.common.err_code) {
      const exp = new Exception(response);
      const error = exp.getInstance();
      return error;
    } else {
      return response.data;
    }
  } catch (err) {
    console.log('error', url, err);
    const error = {
      msg: window._lang.party_star_network_connection_timed_out,
    };
    return Promise.reject(error);
  }
}

async function post<T>(
  url: string,
  header: Record<string, any>,
  data: Record<string, any>,
): Promise<T> {
  if (!data) {
    data = header;
    header = {};
  }
  if (isInApp) {
    const query = await getSign();
    url = url.includes('?') ? `${url}&${query}` : `${url}?${query}`;
  }

  try {
    const response: any = await instance.post(url, data);
    if (response.common && response.common.err_code) {
      const exp = new Exception(response);
      const error = exp.getInstance();
      return error;
    } else {
      return response.data;
    }
  } catch (err) {
    const error = {
      msg: window._lang.party_star_network_connection_timed_out,
    };
    return Promise.reject(error);
  }
}

export default {
  get,
  post,
};
