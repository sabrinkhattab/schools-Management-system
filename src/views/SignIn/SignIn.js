import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Typography,
} from '@material-ui/core';
import useStyles from './styles';
import backgroundImage from '../../assets/images/logo@2x.png'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { LoginForm } from './components'

function SignIn({ state, getschoolLoginData, location }) {

    const classes = useStyles();
    const [schoolName, setSchoolName] = useState('')

    useEffect(() => {
        let schoolName = location.pathname.slice(4)
        setSchoolName(schoolName)
        getschoolLoginData(schoolName).then(res => {

        }).catch(err => console.log(err))
    }, [location]);




    console.log(state)
    return (
        < div className={classes.root} >
            <div className={classes.layer}>
                <Grid
                    alignItems="center"
                    container
                    direction="column"
                    justify="center">
                    <div className={classes.paper}>
                        <Grid container direction="row" className={classes.loginWrapper}>
                            <Grid item lg={6} className={classes.leftSideWrapper}>
                                <Grid container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    spacing={1}
                                    justify="center"
                                >

                                    <Grid item>
                                        <Grid container direction="column" spacing={2} justify="center" alignItems="center" >
                                            <Grid item>
                                                <Typography
                                                    variant="h3"
                                                    style={{ fontWeight: 'bold', fontSize: '29px' }}>
                                                    welcome to {state.schoolLoginData.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1" style={{ color: '#eeeeee', lineHeight: '1.5' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item lg={6} className={classes.rightSideWrapper}>
                                <Grid container direction="column" spacing={1} alignItems="center" justify="center">
                                    <Grid item>
                                        <img alt="School logo" src={backgroundImage} className={classes.schoolLogo} />

                                    </Grid>
                                    <Grid item >
                                        <LoginForm schoolId={state.schoolLoginData.id} schoolName={schoolName} />
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </div>

        </div >
    )
}
const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
    getschoolLoginData: (school_url) => dispatch(actions.getSchoolLoginData(school_url)),
});

SignIn.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));