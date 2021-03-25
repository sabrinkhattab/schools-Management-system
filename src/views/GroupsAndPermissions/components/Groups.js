import React, { useEffect, useState } from 'react';
import useStyles from './styles'
import { Paper, Grid, TextField, Typography, List, ListItem, ListItemIcon, Divider, ListItemText } from '@material-ui/core'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { FormDialog } from './index'
import { useToasts, ToastProvider } from 'react-toast-notifications';

const Groups = ({
    groups,
    getAllGroups,
    onClickGroup,
    selectedIndex,
    editGroupName,
    editedGroup,
    deleteGroup,
    deletedGroup,
    ListArrayIndex

}) => {
    const { addToast } = useToasts();
    const classes = useStyles()
    const [openDel, setOpenDel] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState({})
    const [groupNameValue, setGroupNameValue] = useState('')
    const [rows, setRows] = useState([])


    const handleCloseDelete = () => {
        setOpenDel(false);
    }
    const handleClickOpenDelete = (group) => {
        setOpenDel(true);
        setSelectedGroup(group)
    };
    const onClickDeleteButton = () => {
        deleteGroup(selectedGroup.id).then(res => {
            let filteredUsers = rows.filter((row) => (
                row.id !== selectedGroup.id
            ))
            setRows(filteredUsers)
            addToast('group removed successfully', { appearance: 'success', autoDismiss: true, placement: 'bottom-right' });
            setOpenDel(false);
        }).catch(err => {
            addToast(err.response.data.detail, { appearance: 'error', autoDismiss: true, placement: 'bottom-right' });
        })
    }
    const handleClickOpenEdit = (group) => {
        setOpenEdit(true);
        setSelectedGroup(group)
        setGroupNameValue(group.name)
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);

    }
    const onEditGroupNameChange = (event) => {
        setGroupNameValue(event.target.value)
    }

    const EditGroupDialogBody = () => {
        return (
            <Grid container>
                <Grid item lg={12}>
                    <TextField
                        variant="outlined"
                        name="group-name"
                        label="Group Name"
                        fullWidth
                        value={groupNameValue ? groupNameValue : ''}
                        onChange={onEditGroupNameChange}
                    />
                </Grid>
            </Grid>
        )
    }
    const onClickEditButton = () => {
        editGroupName(selectedGroup.id, { name: groupNameValue }).then(res => {
            rows[ListArrayIndex].group.name = res.data.name
            setOpenEdit(false)
        }).catch(err => {

        })
        console.log(ListArrayIndex)
    }

    useEffect(() => {
        getAllGroups().then(res => {
            setRows(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    useEffect(() => {
        setRows(groups.groups)
    }, [groups.groups])
    return (
        <ToastProvider>
            <div>
                <Typography variant="h4">Groups</Typography>
                <Paper className={classes.rootGroups}>
                    <List component="nav" aria-label="main mailbox folders">
                        {rows && rows.map((group, index) => (
                            <div key={`listItem-${index}`}>
                                <ListItem
                                    button
                                    selected={selectedIndex === group.group.id}
                                    onClick={(event) => onClickGroup(event, group, index)}

                                >
                                    <ListItemText primary={group.group.name} />
                                    <ListItemIcon>
                                        <DeleteIcon
                                            className={classes.deleteIcon}
                                            onClick={() => { handleClickOpenDelete(group.group) }}
                                        />
                                    </ListItemIcon>
                                    <ListItemIcon>
                                        <EditIcon
                                            className={classes.editIcon}
                                            onClick={() => { handleClickOpenEdit(group.group) }}
                                        />
                                    </ListItemIcon>

                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </Paper>
                <FormDialog
                    handleClose={handleCloseDelete}
                    open={openDel}
                    dialogTitle="Delete Group"
                    dialogContentText="are you sure you want to delete this group..?"
                    ActionBtn="DELETE"
                    contentStyle={{ width: '400px' }}
                    onClickActionButton={onClickDeleteButton}
                    loading={deletedGroup.IsLoading}
                />
                <FormDialog
                    handleClose={handleCloseEdit}
                    open={openEdit}
                    dialogTitle="Edit Group Name "
                    ActionBtn="EDIT"
                    dialogBody={EditGroupDialogBody()}
                    contentStyle={{ width: '400px' }}
                    onClickActionButton={onClickEditButton}
                    loading={editedGroup.IsLoading}
                />

            </div>
        </ToastProvider>

    )
}


const mapStateToProps = state => ({
    groups: state.groups,
    editedGroup: state.editedGroup,
    deletedGroup: state.deletedGroup
});

const mapDispatchToProps = dispatch => ({
    getAllGroups: () => dispatch(actions.getAllGroups()),
    editGroupName: (groupId, { name }) => dispatch(actions.editGroupName(groupId, { name })),
    deleteGroup: (groupId) => dispatch(actions.deleteGroup(groupId))

});


export default connect(mapStateToProps, mapDispatchToProps)(Groups);