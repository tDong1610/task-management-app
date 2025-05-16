
import Dashboard from '@mui/icons-material/Dashboard'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLE={
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }

}
function index() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2,
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
      borderBottom:'1px solid white'
    }}>
      <Box sx={ { display:'flex', alignItems:'center', gap:2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<Dashboard />}
          label="Trello App"
          onClick={() => {}}
        />
        <Chip sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Puclic/Private Workspace"
          onClick={() => { }}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          onClick={() => { }}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          onClick={() => { }}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filters"
          onClick={() => { }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
         Invite
        </Button>
        <AvatarGroup max={7} sx={{
          gap:'10px',
          '& .MuiAvatar-root': {
            width: 34,
            height: 34,
            fontSize:16,
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            '&:first-of-type': { bgcolor: '#a4b0be' },
          }
        }}>
          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp"
              src="https://th.bing.com/th/id/OIP.5hHgAzYlrF2DwEeXd6o__AHaE8?w=313&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" />
          </Tooltip>

          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp"
              src="https://th.bing.com/th/id/OIP.5hHgAzYlrF2DwEeXd6o__AHaE8?w=313&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" />
          </Tooltip>

          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp"
              src="https://th.bing.com/th/id/OIP.5hHgAzYlrF2DwEeXd6o__AHaE8?w=313&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" />
          </Tooltip>

          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp"
              src="https://th.bing.com/th/id/OIP.5hHgAzYlrF2DwEeXd6o__AHaE8?w=313&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" />
          </Tooltip>

          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp"
              src="https://th.bing.com/th/id/OIP.5hHgAzYlrF2DwEeXd6o__AHaE8?w=313&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default index
