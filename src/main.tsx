import App from "@/App"
import '@/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/react-study">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
