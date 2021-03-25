import React, { useEffect, useState } from 'react';
import useStyles from './styles'
import { Paper, Button, Grid, TextField, Typography, List, ListItem, ListItemIcon, Divider, ListItemText } from '@material-ui/core'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { FormDialog } from './index'
import { useToasts, ToastProvider } from 'react-toast-notifications';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Groups = ({
    groups,
    getAllGroups,
    onClickGroup,
    selectedIndex,
    editGroupName,
    editedGroup,
    deleteGroup,
    deletedGroup,
    ListArrayIndex,
    createNewGroup,
    newelyCreatedGroup

}) => {
    const { addToast } = useToasts();
    const classes = useStyles()
    const [openDel, setOpenDel] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState({})
    const [groupNameValue, setGroupNameValue] = useState('')
    const [newelyAddedGroupValue, setNewelyAddedGroupValue] = useState('')

    const [rows, setRows] = useState([])

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
    }
    const onAddGroupNameChange = (event) => {
        setNewelyAddedGroupValue(event.target.value)
    }
    const AddGroupDialogBody = () => {
        return (
            <Grid container>
                <Grid item lg={12}>
                    <TextField
                        variant="outlined"
                        name="group-name"
                        label="Group Name"
                        fullWidth
                        value={newelyAddedGroupValue}
                        onChange={onAddGroupNameChange}
                        type="text"
                    />
                </Grid>
            </Grid>
        )
    }

    const onClickAddButton = () => {
        let data = { group: { name: newelyAddedGroupValue }, group_type: 2 }
        createNewGroup(data).then(res => {
            rows.push(res.data)
            setRows(rows)
            addToast('user added to group successfully', { appearance: 'success', autoDismiss: true });
            setOpenAdd(false);
        }).catch(err => console.log(err))
    }

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
                        type="text"
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
                    <Button
                        onClick={handleClickOpenAdd}>
                        <AddCircleIcon className={classes.addIcon} />
                    </Button>
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
                <FormDialog
                    handleClose={handleCloseAdd}
                    open={openAdd}
                    dialogTitle="Add New Group"
                    ActionBtn="Add"
                    dialogBody={AddGroupDialogBody()}
                    contentStyle={{ width: '400px' }}
                    onClickActionButton={onClickAddButton}
                    loading={newelyCreatedGroup.IsLoading}
                />

            </div>
        </ToastProvider>

    )
}


const mapStateToProps = state => ({
    groups: state.groups,
    editedGroup: state.editedGroup,
    deletedGroup: state.deletedGroup,
    newelyCreatedGroup: state.newGroup
});

const mapDispatchToProps = dispatch => ({
    getAllGroups: () => dispatch(actions.getAllGroups()),
    editGroupName: (groupId, { name }) => dispatch(actions.editGroupName(groupId, { name })),
    deleteGroup: (groupId) => dispatch(actions.deleteGroup(groupId)),
    createNewGroup: ({ group, group_type }) => dispatch(actions.createNewGroup({ group, group_type }))
});


export default connect(mapStateToProps, mapDispatchToProps)(Groups);