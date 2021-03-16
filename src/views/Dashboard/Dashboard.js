import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper, Avatar, TextField, Button } from '@material-ui/core';

import { withRouter } from 'react-router-dom';



const Dashboard = () => {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item>
                welcome to dashboard ....
            </Grid>

        </Grid>
    )
}

Dashboard.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
}
export default withRouter(Dashboard)