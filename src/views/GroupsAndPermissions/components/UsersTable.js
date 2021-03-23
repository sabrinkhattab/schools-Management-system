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
    Button
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

const UsersTable = ({ tableData, isLoading, removeGroupUser, selectedGroupIndex, removedUser }) => {
    const { addToast } = useToasts();
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState({})
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState(tableData)
    const classes = useStyles()

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
                                            <Button onClick={() => { handleClickOpen(user) }}><DeleteIcon className={classes.deleteIcon} /></Button>
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
            <Button onClick={handleClickOpenAdd}><AddCircleIcon className={classes.addIcon} /></Button>
            <FormDialog
                handleClose={handleCloseDelete}
                open={open}
                dialogTitle="Delete User "
                dialogContentText="Are you sure you want to delete user from this group ...?"
                ActionBtn="DELETE"
                onClickActionButton={onClickDeleteBtn}
                loading={removedUser.IsLoading}


            />
            <FormDialog
                handleClose={handleCloseADD}
                open={openAdd}
                dialogTitle="Add User "
                dialogContentText="Add new user to this group .."
                ActionBtn="ADD"
            // onClickActionButton={ }

            />
        </>
    )
}

const mapStateToProps = state => ({
    removedUser: state.removedUser
});

const mapDispatchToProps = dispatch => ({
    removeGroupUser: ({ group_id, user_id }) => dispatch(actions.removeUserFromGroup({ group_id, user_id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);