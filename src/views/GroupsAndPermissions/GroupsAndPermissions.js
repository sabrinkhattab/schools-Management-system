import React, { useState } from 'react'
import useStyles from './styles'
import { Grid } from '@material-ui/core'
import { Permissions, Groups, Users } from './components'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { ToastProvider } from 'react-toast-notifications'
const GroupsAndPermissions = ({ groupUsers, getGroupUsers }) => {
    const classes = useStyles()
    const [groupPermissions, setGroupPermissions] = useState([])
    const [tableData, setTableData] = useState([])
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [ListArrayIndex, setListArrayIndex] = useState('')

    const onClickListItem = (event, group, index) => {
        setListArrayIndex(index)
        setSelectedIndex(group.group.id)
        setGroupPermissions(group.group.permissions)
        getGroupUsers(group.group.id).then(res => {
            setTableData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <ToastProvider>

            <div className={classes.root}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Permissions groupPermissions={groupPermissions} />
                    </Grid>
                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item lg={4}>
                                <Groups onClickGroup={onClickListItem} selectedIndex={selectedIndex} ListArrayIndex={ListArrayIndex} />
                            </Grid>
                            <Grid item lg={6}>
                                <Users groupUsers={tableData} isLoading={groupUsers.IsLoading} selectedGroupIndex={selectedIndex} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </ToastProvider>

    )
}

const mapStateToProps = state => ({
    groupUsers: state.groupUsers
});

const mapDispatchToProps = dispatch => ({
    getGroupUsers: (groupId) => dispatch(actions.getGroupUsers(groupId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsAndPermissions);