// import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '~/App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme.js'


createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <App />
  </CssVarsProvider>
  // </React.StrictMode>
)
