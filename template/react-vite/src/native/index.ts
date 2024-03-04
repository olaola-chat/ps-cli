import { QS } from '@ola/utils';

type Cb = (...args: any[]) => void;
type Data = Record<string, any>;

async function callAppMethod(
  funcType: string,
  data?: Data | null,
  callback?: Cb,
  fallback?: Cb,
) {
  if (typeof data === 'function') {
    callback = data as () => void;
    data = null;
  }

  console.info(`调用Native方法: ${funcType} 传递参数: `, data);
  const paramData: any = {};
  if (data) {
    paramData.param = JSON.stringify(data);
  }

  if (
    !window.NativeProxy ||
    typeof window.NativeProxy.postMessage !== 'function'
  ) {
    return console.warn(`不支持调用Native方法: ${funcType}`);
  }

  const cbFunName =
    'nativeCB' + new Date().getTime() + parseInt('' + Math.random() * 100);

  const bridgePromise = new Promise((resolve) => {
    if (callback) {
      window[cbFunName] = function (jsonData: Data) {
        resolve(jsonData);

        callback?.(jsonData);
        // console.info(`Native方法 ${funcType} 回调数据: `, JSON.stringify(jsonData));
        // resolve(jsonData)
        delete window[cbFunName];
      };
      paramData.cb = cbFunName;
    }
    window.NativeProxy.postMessage(
      `banban://${funcType}${paramData ? '?' + QS.stringify(paramData) : ''}`,
    );
  });
  // 兜底 promise
  const errorPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
      fallback && fallback();
    }, 2000);
  });
  const res = await Promise.race([bridgePromise, errorPromise]);
  return res;
}

function listenAppMethod(funcType: string, data: Data | null, callback?: Cb) {
  if (typeof data === 'function') {
    callback = data as () => void;
    data = null;
  }
  window[funcType] = function (jsonData: Data) {
    callback && callback(jsonData);
  };
}

const Native = {
  //获取用户信息
  NativeGetUserInfo: function (cb: Cb) {
    return callAppMethod('getUserInfo', cb);
  },

  //获取用户信息
  NativeGetSign: function (cb: Cb) {
    return callAppMethod('getSign', cb);
  },

  // 获取系统信息
  NativeSystemInfo: function (cb: Cb) {
    return callAppMethod('getSystemInfoSync', cb);
  },

  // 返回上一级/退出webview
  NativeNavigateBack: function () {
    return callAppMethod('navigateBack');
  },

  NativeSetTitle: function (title: string) {
    return callAppMethod('setTitle', { title });
  },

  // 进入指定房间
  NativeOpenRoom: function (rid: number | string) {
    return callAppMethod('openRoom', { rid });
  },
  NativeOpenLiveRoom: function (rid: number | string, uid: number | string) {
    // return callAppMethod('openLiveRoom', JSON.stringify({ rid: Number(rid), uid: Number(uid) }));
    return callAppMethod('openLiveRoom', {
      rid: Number(rid),
      uid: Number(uid),
    });
  },

  // 客户端重新回到H5页面的回调
  NativeReturnToWeb: function (cb: Cb) {
    return listenAppMethod('onReturnToWeb', cb);
  },

  //跳转到个人主页
  NativeShowImageScreen: function (uid: number | string) {
    return callAppMethod('showImageScreen', { uid: uid });
  },

  // 退出
  NativeOnFinish: function () {
    return callAppMethod('onFinish');
  },

  // 分享到第三方
  NativeShareToExternal: function (params: Data, cb: Cb) {
    return callAppMethod('shareToExternal', params, cb);
  },

  // 分享给好友
  NativeShareToUser: function (params: Data, cb: Cb) {
    return callAppMethod('shareToUser', params, cb);
  },
  // 提交埋点
  NativeOnTrack: function (params: Data) {
    return callAppMethod('onTrack', params || '');
  },
  //网络请求
  NativeClientRequestProxy: function (data: Data, cb: Cb) {
    return callAppMethod(
      'clientRequestProxy',
      {
        ...data,
      },
      cb,
    );
  },

  NativeShowCommonWebScreen: function (params: Data) {
    return callAppMethod('showCommonWebScreen', params);
  },

  NativeOpenDeepLink(params: Data) {
    return callAppMethod('showCommonWebScreen', params);
  },

  // 人脸识别
  NativeOpenFaceDetector(params: Data, cb: Cb) {
    return callAppMethod('openFaceDetector', params, cb);
  },
};

export default Native;
