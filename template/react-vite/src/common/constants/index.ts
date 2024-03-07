export const REMOTE_IMAGE_MAP: Record<string, any> = {
  development: import.meta.env.VITE_REACT_APP_IMG_STATIC_DOMAIN_TEST,
  production: import.meta.env.VITE_REACT_APP_IMG_STATIC_DOMAIN,
  production_letspartystar: import.meta.env.VITE_REACT_APP_IMG_STATIC_DOMAIN,
  production_starcloud: import.meta.env.VITE_REACT_APP_IMG_STATIC_DOMAIN_PROD,
  alpha: import.meta.env.VITE_REACT_APP_IMG_STATIC_DOMAIN,
  local: import.meta.env.VITE_REACT_APP_IMG_STATIC_DOMAIN,
};
