import React, { useEffect, useState, useCallback } from 'react';
import useStyles from './styles'
import { Paper, Chip, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

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

    const classes = useStyles()
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    }
    // const addPermissionToGroup = (permission) => {
    //     // if (groupPermissions.includes(permission.id)) {
    //     //     console.log('already exist')
    //     // } else {
    //     //     console.log('call add api')

    //     // }
    //     let data = { group_id: selectedIndex, permission_id: permission.id }
    //     addPermission(data).then(res => {
    //         groupPermissionsArray.push(permission.id)
    //         setGroupPermissionsArray(groupPermissionsArray)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }



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

    // useEffect(() => {
    //     setGroupPermissionsArray((prev) => ([...prev, ...groupPermissions]))
    // }, [groupPermissions])




    return (
        <div>
            <Typography variant="h4">Permissions</Typography>
            <Paper elevation={3} className={classes.rootPermission}>
                {
                    permissions && permissions.permissions && permissions.permissions.map((item) => (
                        <Chip
                            key={item.id}
                            label={item.name}
                            onDelete={handleDelete}
                            disabled={selectedIndex === 0 ? true : false}
                            clickable
                            // onClick={() => { addPermissionToGroup(item) }}
                            className={groupPermissionsArray.includes(item.id) ? classes.activeChip : ''}
                        />
                    ))
                }
            </Paper>
        </div>
    )
}


const mapStateToProps = state => ({
    permissions: state.permissions,
    newGroupPermissions: state.addedPermissionToGroup
});

const mapDispatchToProps = dispatch => ({
    getAllPermissions: () => dispatch(actions.getAllPermissions()),
    addPermission: ({ group_id, permission_id }) => dispatch(actions.addGroupPermission({ group_id, permission_id })),
    removePermission: ({ group_id, permission_id }) => dispatch(actions.removeGroupPermission({ group_id, permission_id })),
});


export default connect(mapStateToProps, mapDispatchToProps)(Permissions);