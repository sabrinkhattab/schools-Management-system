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
        backgroundColor: theme.palette.success.main
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
    chip: {
        // backgroundColor: "#59d8ef",
        // "&:hover": {
        //     backgroundColor: theme.palette.success.light,
        //     cursor: "pointer"
        // },
        // "&:focus": {
        //     backgroundColor: theme.palette.success.main,
        //     cursor: "pointer"
        // }
    }

}));

export default useStyles;
