import { Typography, Button, Paper } from '@material-ui/core';
import React from 'react'
import { UsersTable } from './index'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles'
const Users = () => {
    const classes = useStyles()
    return (
        <>
            <Typography variant="h4">Users</Typography>
            <Paper>
                <UsersTable />
            </Paper>

        </>
    )
}
export default Users;