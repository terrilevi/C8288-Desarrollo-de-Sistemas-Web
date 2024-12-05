import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    commentsOuterContainer: {
        width: '100%',
        marginTop: '20px'
    },
    commentsInnerContainer: {
        maxHeight: '200px',
        overflowY: 'auto',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#fefebb',
        borderRadius: '8px'
    },
    commentFormSection: {
        width: '100%'
    },
    commentInput: {
        marginBottom: '10px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.5)',
            }
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(0, 0, 0, 0.7)',
        },
        '& .MuiInputBase-input': {
            color: '#000000',
        }
    },
    commentButton: {
        backgroundColor: '#397b7b',
        color: 'white',
        '&:hover': {
            backgroundColor: '#2d5f5f',
        },
        '&:disabled': {
            backgroundColor: '#cccccc',
        }
    },
    commentItem: {
        marginBottom: '12px',
        padding: '8px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        '&:last-child': {
            borderBottom: 'none'
        }
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4px'
    },
    commentAuthor: {
        fontWeight: '600',
        color: '#397b7b'
    },
    commentContent: {
        color: '#000000'
    },
    timeStamp: {
        color: '#666',
        fontSize: '0.75rem'
    }
});