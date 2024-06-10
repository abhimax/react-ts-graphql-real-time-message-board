import React from 'react'
import './styles/variables.scss'; // Import global variables
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
