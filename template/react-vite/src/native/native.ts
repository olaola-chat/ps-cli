import { getQuery } from '@ola/utils'

const isInApp = Boolean(window.NativeProxy)

const isFullScreen = getQuery('clientScreenMode') === '1'

const ifUseProxy = getQuery('proxy') === '1'

export { isInApp, isFullScreen, ifUseProxy }