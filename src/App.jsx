
import './App.css'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()

  return (
    <Button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      Toggle to {mode === 'dark' ? 'light' : 'dark'} mode
    </Button>
  )
}

function App() {

  return (
    <>
      <ModeToggle />
      <hr />
      <Typography variant="h1" color="text.secondary">Theme</Typography>
      <Button variant="contained">Hello world</Button>

    </>
  )
}

export default App
