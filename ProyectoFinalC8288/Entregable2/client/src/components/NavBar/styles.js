import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor: 'black',
  },
  image: {
    height: '150px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: 'white',
    '& > *': {  // Esto asegura el espaciado correcto entre elementos
        marginLeft: theme.spacing(1),
    }
},
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    marginLeft: '5px',    // Added small margin from avatar
    marginRight: '15px',  // Added margin before logout button
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: '#397b7b',
  },
}));