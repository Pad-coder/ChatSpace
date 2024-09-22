import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import './index.css'
import { SocketContextProvider } from './socket/SocketContext.jsx'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <SocketContextProvider>
  <QueryClientProvider client={queryClient}>
   <App/>
  </QueryClientProvider>
  </SocketContextProvider>
  </BrowserRouter>
  </StrictMode>,
)
