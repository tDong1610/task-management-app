import { deepOrange, orange, red } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
import { teal, cyan } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary:teal,
        secondary:deepOrange
      }
    },
    dark: {
      palette: {
        palette:cyan,
        secondary:orange
      }
    }
  }
})

export default theme