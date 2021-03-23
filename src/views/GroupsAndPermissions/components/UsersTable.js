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
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles'
import { FormDialog } from './index'
import AddCircleIcon from '@material-ui/icons/AddCircle';

const UsersTable = () => {
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);

    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const users = [
        {
            "id": 1,
            "sid": {
                "id": 1,
                "name": "Teqneia",
                "url": "teq",
                "location": "Sheikh Zayed",
                "code": "teq-123",
                "status": 1,
                "logo": "/files/logos/school_logo.png",
                "country": 63
            },
            "first_name": "abdelnasser",
            "middle_name": "",
            "last_name": "Ismaiel",
            "email": "nasser@teqneia.com",
            "phone_number": "+201091238274",
            "created_at": "2021-03-22T15:16:55.695314Z",
            "updated_at": "2021-03-22T15:16:55.695349Z",
            "profile_picture": "/files/default_profile_picture/avatar.png"
        },
        {
            "id": 2,
            "sid": {
                "id": 1,
                "name": "Teqneia",
                "url": "teq",
                "location": "Sheikh Zayed",
                "code": "teq-123",
                "status": 1,
                "logo": "/files/logos/school_logo.png",
                "country": 63
            },
            "first_name": "sabrin",
            "middle_name": "",
            "last_name": "khattab",
            "email": "nasser@teqneia.com",
            "phone_number": "+201091238274",
            "created_at": "2021-03-22T15:16:55.695314Z",
            "updated_at": "2021-03-22T15:16:55.695349Z",
            "profile_picture": "/files/default_profile_picture/avatar.png"
        },
        {
            "id": 3,
            "sid": {
                "id": 1,
                "name": "Teqneia",
                "url": "teq",
                "location": "Sheikh Zayed",
                "code": "teq-123",
                "status": 1,
                "logo": "/files/logos/school_logo.png",
                "country": 63
            },
            "first_name": "ahmad",
            "middle_name": "",
            "last_name": "kelany",
            "email": "nasser@teqneia.com",
            "phone_number": "+201091238274",
            "created_at": "2021-03-22T15:16:55.695314Z",
            "updated_at": "2021-03-22T15:16:55.695349Z",
            "profile_picture": "/files/default_profile_picture/avatar.png"
        }
    ]
    const [rows, setRows] = useState(users)
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseADD = () => {
        setOpenAdd(false);
    };

    useEffect(() => {
        let filteredData = users.filter((user) => {
            let name = `${user.first_name} ${user.middle_name} ${user.last_name}`
            return name.toLowerCase().includes(searchValue.toLowerCase());
        })
        setRows(filteredData)
    }, [searchValue])



    return (
        <>
            <SearchBar
                value={searchValue}
                onChange={(newValue) => { handleSearchInputChange(newValue) }}
                onRequestSearch={() => search(searchValue)}
            />
            <TableContainer>
                <Table
                // className={classes.table}
                // aria-labelledby="tableTitle"
                // size={dense ? 'small' : 'medium'}
                // aria-label="enhanced table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableHeadStyle}>User Name</TableCell>
                            <TableCell align="center" className={classes.tableHeadStyle}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row" align="center">
                                    {`${user.first_name} ${user.middle_name} ${user.last_name}`}
                                </TableCell>
                                <TableCell align="center">
                                    <Button onClick={handleClickOpen}><DeleteIcon className={classes.deleteIcon} /></Button>
                                </TableCell>

                            </TableRow>
                        ))}
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
                handleClose={handleClose}
                open={open}
                dialogTitle="Delete User "
                dialogContentText="Are you sure you want to delete user from this group ...?"
                ActionBtn="DELETE"

            />
            <FormDialog
                handleClose={handleCloseADD}
                open={openAdd}
                dialogTitle="Add User "
                dialogContentText="Add new user to this group .."
                ActionBtn="ADD"

            />
        </>
    )
}
export default UsersTable;