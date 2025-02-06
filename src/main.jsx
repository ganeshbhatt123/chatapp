import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux';
import store from './redux/store.js'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient} contextSharing>
  <Provider store={store}>
    <Toaster position='bottom-right' />
    <StrictMode>
    <App />
  </StrictMode>
  </Provider>
</QueryClientProvider>
)
