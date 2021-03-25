import React, { useState } from 'react'
import useStyles from './styles'
import { Grid } from '@material-ui/core'
import { Permissions, Groups, Users } from './components'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const GroupsAndPermissions = ({ groupUsers, getGroupUsers }) => {
    const classes = useStyles()
    const [groupPermissions, setGroupPermissions] = useState([])
    const [tableData, setTableData] = useState([])
    const [selectedIndex, setSelectedIndex] = React.useState(0);


    const onClickListItem = (event, group) => {
        setSelectedIndex(group.group.id)
        setGroupPermissions(group.group.permissions)
        getGroupUsers(group.group.id).then(res => {
            setTableData(res.data)
        }).catch(err => {
            console.log(err)
        })
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
                            <Users groupUsers={tableData} isLoading={groupUsers.IsLoading} selectedGroupIndex={selectedIndex} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    groupUsers: state.groupUsers
});

const mapDispatchToProps = dispatch => ({
    getGroupUsers: (groupId) => dispatch(actions.getGroupUsers(groupId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsAndPermissions);