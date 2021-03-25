import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles'
import { CircularProgress } from '@material-ui/core';

const FormDialog = ({
    handleClose,
    open,
    dialogTitle,
    dialogContentText,
    dialogBody,
    ActionBtn,
    onClickActionButton,
    loading,
    contentStyle

}) => {

    const styles = useStyles()
    return (
        <div >
            <Dialog
                open={open}
                onClose={handleClose}

            >

                <DialogTitle id="form-dialog-title" >{dialogTitle}</DialogTitle>
                <DialogContent style={contentStyle}>
                    <DialogContentText>
                        {dialogContentText}
                    </DialogContentText>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> */}
                    {dialogBody}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={onClickActionButton} color="primary" variant="contained">
                        {ActionBtn}{loading ? <CircularProgress size={20} style={{ marginLeft: '5px' }} color="secondary" /> : ''}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;
