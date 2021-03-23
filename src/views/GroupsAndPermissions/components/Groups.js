import React, { useEffect, useState } from 'react';
import useStyles from './styles'
import { Paper, Chip, Typography, List, ListItem, ListItemIcon, Divider, ListItemText } from '@material-ui/core'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Groups = ({ groups, getAllGroups, onClickGroup, selectedIndex }) => {
    const classes = useStyles()


    useEffect(() => {
        getAllGroups().then(res => {
            console.log('res', res)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div>
            <Typography variant="h4">Groups</Typography>
            <Paper className={classes.rootGroups}>
                <List component="nav" aria-label="main mailbox folders">
                    {groups && groups.groups && groups.groups.map((group, index) => (
                        <div key={`listItem-${index}`}>
                            <ListItem
                                button
                                selected={selectedIndex === group.id}
                                onClick={(event) => onClickGroup(event, group)}

                            >
                                <ListItemText primary={group.name} />
                                <ListItemIcon>
                                    <DeleteIcon className={classes.deleteIcon} />
                                </ListItemIcon>
                                <ListItemIcon>
                                    <EditIcon className={classes.editIcon} />
                                </ListItemIcon>

                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            </Paper>

        </div>
    )
}


const mapStateToProps = state => ({
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({
    getAllGroups: () => dispatch(actions.getAllGroups()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Groups);