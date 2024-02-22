interface Window {
  NativeProxy: { postMessage: (message: string) => void };
  [key: string]: any;
  LOG: {
    setSuperProperties: (params: Record<string, any>) => void;
    login: (uid: number | string) => void;
    track: (event: string, params?: Record<string, any>) => void;
  };
}