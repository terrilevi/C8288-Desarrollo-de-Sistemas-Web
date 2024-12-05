import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#FEFEBB',
  },
  title: {
    marginBottom: theme.spacing(3),
    color: '#000000',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  submit: {
    backgroundColor: '#397b7b',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2d5f5f',
    },
  },
  cancel: {
    backgroundColor: '#705865',
    color: 'white',
    '&:hover': {
      backgroundColor: '#5a4652',
    },
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(0, 0, 0, 0.7)',
    },
    '& .MuiInputBase-input': {
      color: '#000000',
    },
  },
}));