import React, { useEffect, useState, useCallback } from 'react';
import useStyles from './styles'
import { Paper, Chip, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { useToasts, ToastProvider } from 'react-toast-notifications';

const Permissions = ({
    permissions,
    getAllPermissions,
    groupPermissions,
    selectedIndex,
    addPermission,
    removePermission,
    newGroupPermissions
}) => {
    const [groupPermissionsArray, setGroupPermissionsArray] = useState(groupPermissions)
    const { addToast } = useToasts();
    const classes = useStyles()
    const handleDelete = (item) => {
        if (groupPermissionsArray.includes(item.id)) {
            let data = { group_id: selectedIndex, permission_id: item.id }
            removePermission(data).then(res => {
                let filteredData = groupPermissionsArray.filter((permission) => (
                    permission !== item.id
                ))
                setGroupPermissionsArray(filteredData)
                addToast('permission removed from group successfully', { appearance: 'success', autoDismiss: true });

            }).catch(err => {
                console.log(err)
            })
        } else {
            addToast('this permission already not alocated to this group', { appearance: 'info', autoDismiss: true });
        }

    }
    const addPermissionToGroup = (permission) => {
        if (groupPermissions.includes(permission.id)) {
            addToast('this permission already alocated to this group', { appearance: 'info', autoDismiss: true });
        } else {
            let data = { group_id: selectedIndex, permission_id: permission.id }
            addPermission(data).then(res => {
                groupPermissionsArray.push(permission.id)
                setGroupPermissionsArray(groupPermissionsArray)
                addToast('permission added successfully to this group', { appearance: 'success', autoDismiss: true });
            }).catch(err => {
                console.log(err)
            })
        }

    }



    useEffect(() => {
        getAllPermissions().then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        setGroupPermissionsArray(groupPermissions)
    }, [selectedIndex])

    useEffect(() => {
        let newPermissions = newGroupPermissions && newGroupPermissions.permissions
        setGroupPermissionsArray(newPermissions)
    }, [newGroupPermissions])

    return (
        <div>
            <Typography variant="h4">Permissions</Typography>
            <Paper elevation={3} className={classes.rootPermission}>
                {
                    permissions && permissions.permissions && permissions.permissions.map((item) => (
                        <Chip
                            key={item.id}
                            label={item.name}
                            onDelete={() => { handleDelete(item) }}
                            disabled={selectedIndex === 0 ? true : false}
                            onClick={() => { addPermissionToGroup(item) }}
                            className={groupPermissionsArray && groupPermissionsArray.includes(item.id) ? classes.activeChip : classes.unSelectedChip}
                        />
                    ))
                }
            </Paper>
        </div>
    )
}


const mapStateToProps = state => ({
    permissions: state.permissions,
    newGroupPermissions: state.addedPermissionToGroup.groupPermissions
});

const mapDispatchToProps = dispatch => ({
    getAllPermissions: () => dispatch(actions.getAllPermissions()),
    addPermission: ({ group_id, permission_id }) => dispatch(actions.addGroupPermission({ group_id, permission_id })),
    removePermission: ({ group_id, permission_id }) => dispatch(actions.removeGroupPermission({ group_id, permission_id })),
});


export default connect(mapStateToProps, mapDispatchToProps)(Permissions);