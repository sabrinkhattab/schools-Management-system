import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper, Avatar, TextField, Button } from '@material-ui/core';
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import parsePhoneNumber from 'libphonenumber-js'

import { withRouter } from 'react-router-dom';
import { ResponsiveDrawer } from '../../layout'


const Dashboard = () => {
    console.log(isValidPhoneNumber('01512108605', 'EG'))
    let phone = parsePhoneNumber('01512108605')
    console.log(phone)

    return (
        // <Grid container justify="center" alignItems="center">
        //     <Grid item>
        //     </Grid>

        // </Grid>
        <>
            <ResponsiveDrawer />
        </>
    )
}

Dashboard.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
}
export default withRouter(Dashboard)