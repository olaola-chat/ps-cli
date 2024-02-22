export default function setConsole() {
  const needConsole = window.location.href.includes('console');
  const isLocal = window.location.href.includes('localhost');
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;
  const isDevPage = window.location.href.includes('dev-page');
  if (isLocal || isProduction) return;
  if (isDevelopment || needConsole || isDevPage)
    return import('vconsole').then(({ default: VConsole }) => new VConsole());
}
