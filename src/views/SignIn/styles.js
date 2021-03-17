import { makeStyles } from '@material-ui/styles';
import backgroundImage from '../../assets/images/book-with-green-board-background.jpg'
const useStyles = makeStyles(theme => ({
    paper: {
        width: '50%',
        height: '70vh',
        justifySelf: 'center',
        alignSelf: 'center',
        marginTop: '3em',

    },
    leftSideWrapper: {
        padding: '2em'
    },
    loginWrapper: {
        height: "100%"
    },
    schoolLogo: {
        width: '70px',
        height: '70px'

    },
    root: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: '100vh',
        webkitBackgroundSize: 'cover',
        width: '100%',

    },
    layer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5);',
        height: '100vh',
        width: '100%',

    },
    rightSideWrapper: {
        padding: '3em',
        backgroundColor: 'rgba(255,255,255,.9)',
        borderRadius: '3px'


    },

    loading: {
        marginLeft: '10px'
    }
}));

export default useStyles;
