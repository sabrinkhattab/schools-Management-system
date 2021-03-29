import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    rootPermission: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
        height: '30vh',
        overflowY: 'scroll'
    },
    activeChip: {
        backgroundColor: theme.palette.success.main,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.success.main,
        }
    },
    unSelectedChip: {
        backgroundColor: 'rgb(206, 206, 206)'
    },
    deleteIcon: {
        color: theme.palette.error.main
    },
    editIcon: {
        color: theme.palette.success.main
    },
    rootGroups: {
        overflowY: 'auto',
    },
    tableHeadStyle: {
        fontWeight: 'bold',
        fontSize: '16px'

    },
    addIcon: {
        color: theme.palette.info.main,
        fontSize: '35px'
    },
    addBtn: {
        textAlign: 'center'
    },
    CircularProgress: {
        width: '25px'
    },
    dialogCustomizedWidth: {
        'max-width': '80%'
    },

}));

export default useStyles;
