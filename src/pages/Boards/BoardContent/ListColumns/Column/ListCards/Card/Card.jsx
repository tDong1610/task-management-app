
import { Card as MuiCard } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px 0 rgba(0,0,0,0.2)',
          overflow: 'unset'
        }}
      >
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Card Test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px 0 rgba(0,0,0,0.2)',
        overflow: 'unset'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://th.bing.com/th/id/R.b9c358b2dd1ed128485f77dad518c546?rik=1YT6Q9EM367g1g&riu=http%3a%2f%2feskipaper.com%2fimages%2ftulips-12.jpg&ehk=kMZBJ%2bJ20lYbsJzGQcpump%2fu5K0GbdSe2I1OzwOBX7U%3d&risl=&pid=ImgRaw&r=0"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Lizard</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>
                  20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
                  10
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
                  25
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
