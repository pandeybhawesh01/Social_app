import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppContextProvider } from './contex/AppContex.jsx'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
    <App />
    </AppContextProvider>
  </BrowserRouter>
)
