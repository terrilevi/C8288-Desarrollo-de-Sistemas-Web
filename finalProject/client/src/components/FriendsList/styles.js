import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#FEFEBB',
    marginTop: theme.spacing(2)
  },
  friendItem: {
    padding: '10px 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  }
}));