import imgDefaultAvatar from '@/assets/img_default_avatar.png';
import { REMOTE_IMAGE_MAP } from '@/common/constants';
import { isInApp } from '@/native/native';
export const px2vw = (px: number, base = 750): string => {
  return Number(px)
    ? `${(Math.round((Number(px) / base) * 100000) / 100000) * 100}vw`
    : '0vw';
};

export const getServerEnv = () => {
  // const search = new URLSearchParams(window.location.search);
  // const searchEnvAlpha = search.get('server_env') === 'alpha';
  // const searchEnvProd = search.get('server_env') === 'production';

  let server_env = localStorage.getItem('server_env') || 'development';

  if (import.meta.env.DEV) {
    return server_env;
  }

  if (document.location.href.indexOf('letspartystar') > -1) {
    server_env = 'production_letspartystar';
    return server_env;
  }

  if (
    document.location.href.indexOf('starcloud.rocks') > -1 ||
    document.location.href.indexOf('starcloud.cloud') > -1
  ) {
    server_env = 'production_starcloud';
    return server_env;
  }

  if (!isInApp) {
    if (
      window.location.href.indexOf(':300') < 0 &&
      window.location.href.indexOf(':8082') < 0 &&
      window.location.href.indexOf('47.96.23.201') < 0 &&
      window.location.href.indexOf('partystar-dev.iambanban.com') < 0
    ) {
      server_env = 'production';
    }
  }

  return server_env;
};

export const isHttp = (url: string) => /^http(s?):\/\//.test(url);
export const joinUrl = (a: string, b: string) => {
  if (a.endsWith('/')) {
    a = a.substr(0, a.length - 1);
  }
  if (b.startsWith('/')) {
    b = b.substr(1);
  }

  return [a, b].join('/').replace(/\/$/, '');
};

export const getImageUrl = (icon: string, isAvatar = false) => {
  if (!icon) {
    if (isAvatar) {
      return imgDefaultAvatar;
    }

    return '';
  }

  if (isHttp(icon) || icon.startsWith('data:')) {
    return icon;
  }

  // icon = joinUrl(REMOTE_IMAGE_MAP[server_env] || '', icon);
  // 头像取正式环境地址
  icon = joinUrl(
    REMOTE_IMAGE_MAP[isAvatar ? 'production' : getServerEnv()] || '',
    icon,
  );

  if (isAvatar) {
    icon += '!head150';
  }
  return icon;
};
