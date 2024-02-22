import './index.css';
import { render } from 'react-dom';
import { getQuery } from '@ola/utils';
import setConsole from './common/setConsole';
import Native from './native';
import { isInApp } from './native/native';
import Locales from './locale';

const root = document.getElementById('root') as HTMLElement;

async function setupApp() {
  let _lan =
    getQuery('lan')?.toLowerCase() || window.navigator.language || 'en';

  if (isInApp) {
    const _data: any = await Native.NativeGetUserInfo(() => {});
    const reportInfo = JSON.parse(_data.reportInfo);
    if (window) {
      window['localUserToken'] = _data.token;
    }
    localStorage.setItem('user-token', _data.token);
    localStorage.setItem('uid', _data.uid);
    localStorage.setItem('pkg', _data.package);
    localStorage.setItem('reportInfo', _data.reportInfo);
    localStorage.setItem('server_env', _data.server_env);
    localStorage.setItem('lan', _data.lan);
    localStorage.setItem('app_version', reportInfo.version);
    localStorage.setItem('app_mac', reportInfo.mac);

    if (_data.lan) {
      localStorage.setItem('app_lan', _data.lan);
      _lan = _data.lan;
    }
    window.LOG.setSuperProperties({
      package_name: _data.package,
      channel: reportInfo.channel,
      app_version: reportInfo.version,
      server_env: _data.server_env,
      app_lan: _data.lan,
    });

    window.LOG.login(_data.uid);
  } else {
    console.log('out app');
  }
  window._lan = _lan;
  window._lang = Locales.init(_lan);
}

function setupDirection() {
  const mirrorLanguage = ['ar'];
  if (window._lan && mirrorLanguage.includes(window._lan)) {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
}

async function setup() {
  await setConsole();
  await setupApp();
  setupDirection();
}

setup()
  .then(async () => {
    const { default: App } = await import('./App');
    render(<App />, root);
  })
  .catch((err) => {
    render(<div>{(err as Error).message}</div>, root);
  });
