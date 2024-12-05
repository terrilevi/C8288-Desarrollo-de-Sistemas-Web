import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  card: {
    backgroundColor: '#705865',
    padding: '15px',
    borderRadius: '15px',
    width: '100%'
  },
  content: {
    display: 'flex',
    gap: '20px'
  },
  imageSection: {
    width: '200px',
    flexShrink: 0
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  details: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  postInfo: {
    marginBottom: '10px'
  },
  creator: {
    color: '#000000',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 5px 0'
  },
  creatorSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  
  friendButton: {
    minWidth: '35px',
    padding: '5px',
    backgroundColor: '#397b7b',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2d5f5f',
    },
  },
  timestamp: {
    color: '#000000',
    fontSize: '14px',
    margin: 0
  },
  message: {
    color: '#000000',
    fontSize: '16px',
    margin: '0 0 10px 0'
  },
  requestSent: {
    fontSize: '12px',
    color: '#397b7b',
    fontStyle: 'italic'
  },
  reactionIcon: {
    width: '24px',
    height: '24px',
    marginRight: '5px'
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    '& .MuiButton-root': {
      backgroundColor: '#397b7b',
      color: 'white',
      minWidth: 'auto',
      padding: '8px 16px',
      '&:hover': {
        backgroundColor: '#2d5f5f',
      },
    }
  }
});