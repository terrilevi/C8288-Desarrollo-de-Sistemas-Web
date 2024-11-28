import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#FEFEBB',
    marginTop: theme.spacing(2)
  },
  requestItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },
  acceptButton: {
    backgroundColor: '#397b7b',
    color: 'white',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#2d5f5f',
    }
  },
  rejectButton: {
    backgroundColor: '#705865',
    color: 'white',
    '&:hover': {
      backgroundColor: '#5a4652',
    }
  }
}));