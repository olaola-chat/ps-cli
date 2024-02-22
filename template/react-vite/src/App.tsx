
import Router from './Router'
import ErrorBoundary from './common/ErrorBoundary/ErrorBoundary'
import Toast from './common/Toast/Toast'
import { GlobalContextProvider } from './context/globalContext'


export default function App() {
  return (
    <ErrorBoundary>
      <Toast />
      <GlobalContextProvider>
        <Router />
      </GlobalContextProvider>
    </ErrorBoundary>
  )
}
