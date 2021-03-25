import { Typography, Button, Paper } from '@material-ui/core';
import React from 'react'
import { UsersTable } from './index'

import useStyles from './styles'
const Users = ({ groupUsers, isLoading, selectedGroupIndex }) => {
    const classes = useStyles()
    return (
        <>
            <Typography variant="h4">Users</Typography>
            <Paper>
                <UsersTable tableData={groupUsers} isLoading={isLoading} selectedGroupIndex={selectedGroupIndex} />
            </Paper>

        </>
    )
}
export default Users;