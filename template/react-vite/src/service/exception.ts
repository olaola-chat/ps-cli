
export default class Exception {
  response: any;
  defaultMessage: string;
  constructor(response: any) {
    this.response = response;
    this.defaultMessage = '网络错误';
  }

  static exceptionMap = {
    400: '请求出错了',
    401: '暂无权限',
    403: '请求出错了',
    500: '服务器错误',
    501: '服务器错误',
    502: '服务器错误',
    503: '服务器错误'
  }

  getInstance() {
    const data = this.response.data;
    const status = this.response.status as keyof typeof Exception.exceptionMap;
    let msg = '';

    if (data.msg) {
      msg = data.msg;
    } else {
      msg = Exception.exceptionMap[status] || this.defaultMessage;
    }
    data.msg = msg;

    return data;
  }
}