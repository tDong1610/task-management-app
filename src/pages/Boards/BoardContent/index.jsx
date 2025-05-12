
import { Box } from '@mui/material'

function index() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      display: 'flex',
      alignItems: 'center'
    }}>
          Board Content
    </Box>
  )
}

export default index
