import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#FEFEBB', 
    '& .MuiInputBase-root': {
      color: 'black'  
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(0, 0, 0, 0.7)'  
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',  
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.5)',  
      }
    }
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    color: 'black' 
  },
  buttonSubmit: {
    marginBottom: 10,
  }
}));