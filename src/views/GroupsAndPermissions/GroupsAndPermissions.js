import React, { useState } from 'react'
import useStyles from './styles'
import { Grid } from '@material-ui/core'
import { Permissions, Groups, Users } from './components'
const GroupsAndPermissions = () => {
    const classes = useStyles()
    const [groupPermissions, setGroupPermissions] = useState([])
    const [selectedIndex, setSelectedIndex] = React.useState(0);


    const onClickListItem = (event, group) => {
        setSelectedIndex(group.id)
        setGroupPermissions(group.permissions)
    }
    return (
        <div className={classes.root}>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Permissions groupPermissions={groupPermissions} />
                </Grid>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item lg={4}>
                            <Groups onClickGroup={onClickListItem} selectedIndex={selectedIndex} />
                        </Grid>
                        <Grid item lg={6}>
                            <Users />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default GroupsAndPermissions;