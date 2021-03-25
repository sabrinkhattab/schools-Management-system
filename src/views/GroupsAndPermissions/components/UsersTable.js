import React, { useEffect, useState } from 'react'
import {
    Paper,
    TablePagination,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Button,
    Grid,
    TextField,
    MenuItem
} from '@material-ui/core'
import SearchBar from "material-ui-search-bar";
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles'
import { FormDialog } from './index'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { useToasts } from 'react-toast-notifications';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const UsersTable = ({
    tableData,
    isLoading,
    removeGroupUser,
    selectedGroupIndex,
    removedUser,
    getAllUsers,
    users,
    addUserToGroup,
    addedUser
}) => {
    const { addToast } = useToasts();
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState({})
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState(tableData)
    const [selectedUser, setSelectedUser] = useState('')
    const classes = useStyles()

    const addUserDialogBody = () => (
        (users.IsLoading) ?
            <Grid container justify="center" alignItems="center">
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid> :
            <form>
                <Grid container>
                    <Grid item lg={12}>
                        <TextField
                            select
                            label="Users"
                            name="user"
                            fullWidth
                            variant="outlined"
                            value={selectedUser}
                            onChange={onSelectUserChange}
                        >
                            {
                                users && users.users && users.users.map((user) => (
                                    <MenuItem key={user.user_id} value={user.user_id}>
                                        {`${user.first_name} ${user.middle_name} ${user.last_name}`}
                                    </MenuItem>
                                ))
                            }
                        </TextField>

                    </Grid>
                </Grid>

            </form>
    )

    const onSelectUserChange = (event) => {
        setSelectedUser(event.target.value)
    }
    const onClickAddButton = () => {
        addUserToGroup({ group_id: selectedGroupIndex, user_id: selectedUser }).then(res => {
            rows.push(res.data)
            setRows(rows)
            addToast('user added to group successfully', { appearance: 'success', autoDismiss: true });
            setOpenAdd(false);
        }).catch(err => {

        })
    }
    const search = (value) => {
        console.log(value)
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchInputChange = (newValue) => {
        setSearchValue(newValue)

    }
    const onClickDeleteBtn = () => {
        let data = { group_id: selectedGroupIndex, user_id: selectedRow.user_id }
        removeGroupUser(data).then(res => {
            let filteredUsers = rows.filter((row) => (
                row.user_id !== res.data.user_id
            ))
            setRows(filteredUsers)
            addToast('user removed from group successfully', { appearance: 'success', autoDismiss: true });
            setOpen(false);
        }).catch(err => {
            console.log('err', err)
        })

    }

    const handleClickOpen = (user) => {
        setOpen(true);
        setSelectedRow(user)
    };

    const handleCloseDelete = () => {
        setOpen(false);
    };
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
        getAllUsers(selectedGroupIndex).then(res => {
            console.log('res', res)
        }).catch(err => {
            console.log(err)
        })
    };

    const handleCloseADD = () => {
        setOpenAdd(false);
    };

    useEffect(() => {
        let filteredData = tableData.filter((user) => {
            let name = `${user.first_name} ${user.middle_name} ${user.last_name}`
            return name.toLowerCase().includes(searchValue.toLowerCase());
        })
        setRows(filteredData)
    }, [searchValue])

    useEffect(() => {
        setRows(tableData)
    }, [tableData])

    console.log('selectedGroupIndex', selectedGroupIndex)
    return (
        <>
            <SearchBar
                value={searchValue}
                onChange={(newValue) => { handleSearchInputChange(newValue) }}
                onRequestSearch={() => search(searchValue)}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableHeadStyle}>User Name</TableCell>
                            <TableCell align="center" className={classes.tableHeadStyle}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {isLoading ?
                            <TableRow>
                                <TableCell>
                                    <CircularProgress />
                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow> :
                            (rows.length === 0) ?
                                <TableRow>
                                    <TableCell>
                                        No Users ..
                                    </TableCell>
                                    <TableCell>

                                    </TableCell>
                                </TableRow> :
                                rows && rows.map((user) => (
                                    <TableRow key={`user${user.user_id}`}>
                                        <TableCell component="th" scope="row" align="center">
                                            {`${user.first_name} ${user.middle_name} ${user.last_name}`}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="remove user from group">
                                                <IconButton aria-label="" onClick={() => { handleClickOpen(user) }}>
                                                    <DeleteIcon className={classes.deleteIcon} />
                                                </IconButton>
                                            </Tooltip>

                                        </TableCell>

                                    </TableRow>
                                ))
                        }
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={30}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Button onClick={handleClickOpenAdd} disabled={selectedGroupIndex === 0}><AddCircleIcon className={classes.addIcon} /></Button>
            <FormDialog
                handleClose={handleCloseDelete}
                open={open}
                dialogTitle="Remove User "
                dialogContentText="Are you sure you want to remove user from this group ...?"
                ActionBtn="REMOVE"
                onClickActionButton={onClickDeleteBtn}
                loading={removedUser.IsLoading}


            />
            <FormDialog
                handleClose={handleCloseADD}
                open={openAdd}
                dialogTitle="Add User "
                dialogContentText="Add new user to this group .."
                ActionBtn="ADD"
                dialogBody={addUserDialogBody()}
                contentStyle={{ width: '400px' }}
                onClickActionButton={onClickAddButton}
                loading={addedUser.IsLoading}
            />
        </>
    )
}

const mapStateToProps = state => ({
    removedUser: state.removedUser,
    users: state.AllUsers,
    addedUser: state.addedUser
});

const mapDispatchToProps = dispatch => ({
    removeGroupUser: ({ group_id, user_id }) => dispatch(actions.removeUserFromGroup({ group_id, user_id })),
    getAllUsers: (groupId) => dispatch(actions.listAllUsers(groupId)),
    addUserToGroup: ({ user_id, group_id }) => dispatch(actions.addUserToGroup({ user_id, group_id }))
});


export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);