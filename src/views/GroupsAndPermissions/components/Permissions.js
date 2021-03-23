import React, { useEffect, useState } from 'react';
import useStyles from './styles'
import { Paper, Chip, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const Permissions = ({ permissions, getAllPermissions, groupPermissions }) => {
    const classes = useStyles()

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    }
    const handleClick = (permission) => {

        console.log(permission)
    }


    useEffect(() => {
        getAllPermissions().then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }, [])



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
                            clickable
                            onClick={() => { handleClick(item) }}
                            className={groupPermissions.includes(item.id) ? classes.activeChip : ''}
                        />
                    ))
                }

            </Paper>
        </div>
    )
}


const mapStateToProps = state => ({
    permissions: state.permissions
});

const mapDispatchToProps = dispatch => ({
    getAllPermissions: () => dispatch(actions.getAllPermissions()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Permissions);