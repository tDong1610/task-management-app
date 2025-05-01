import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Typography variant="h1" color="text.secondary">Theme</Typography>
      <Button variant="contained">Hello world</Button>

    </>
  )
}

export default App
