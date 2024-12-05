import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#fefebb',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiInputBase-root': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.5)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'black',
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#397b7b',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2d5f5f',
    },
  },
}));