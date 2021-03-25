import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ResponsiveDrawer } from '../../layout'
import { getItemFromLocalStorage } from '../../helpers/localStorage'
import { isLoggedIn } from '../../helpers/TokenProvider'

const Dashboard = () => {
    let accessToken = getItemFromLocalStorage('accessToken')
    // console.log(getItemFromLocalStorage('accessToken'))
    // console.log(getItemFromLocalStorage('refreshToken'))
    console.log(accessToken)

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