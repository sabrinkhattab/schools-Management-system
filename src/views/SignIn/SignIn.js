import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Typography,
    Paper,
    Avatar,
    TextField,
    Button,
    FormControl,
    CircularProgress
} from '@material-ui/core';
import useStyles from './styles';
import backgroundImage from '../../assets/images/logo@2x.png'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { getItemFromLocalStorage } from '../../helpers/localStorage'
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from "react-router-dom";


function SignIn({ state, getschoolLoginData, location, signIn }) {


    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();

    const classes = useStyles();
    let history = useHistory();
    const [schoolId, setSchoolId] = useState('')
    const [schoolName, setSchoolName] = useState('')

    useEffect(() => {
        let schoolName = location.pathname.slice(4)
        setSchoolName(schoolName)
        getschoolLoginData(schoolName).then(res => {

        }).catch(err => console.log(err))
    }, [location]);


    const onSubmit = data => {
        let sid = state.schoolLoginData.id
        let formData = { ...data, 'sid': sid }
        console.log(formData)
        signIn(formData).then(res => {
            history.push(`/sc/${schoolName}/dashboard`)
        }).catch(err => {
            console.log('err', err)

        })
        console.log(data)
    };

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
                                    {/* <Grid item>
                                    </Grid> */}
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
                                        <form className={classes.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                                            <Grid container direction="column" spacing={2} alignItems="center" justify="center">
                                                <Grid item>
                                                    <FormControl fullWidth variant="outlined">
                                                        <Controller
                                                            name="phone_number"
                                                            as={
                                                                <TextField
                                                                    id="phone_number"
                                                                    helperText={fieldsErrors.phone_number ? fieldsErrors.phone_number.message : null}
                                                                    variant="outlined"
                                                                    label="Email or Phone"
                                                                    error={fieldsErrors.phone_number ? true : false}
                                                                />
                                                            }
                                                            control={control}
                                                            defaultValue=""
                                                            rules={{
                                                                required: 'Required',
                                                                pattern: [{
                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                    message: 'invalid email address'
                                                                },
                                                                {
                                                                    value: /^(010|011|012)[0-9]{8}$/i,
                                                                    message: 'invalid phone number '
                                                                }
                                                                ]
                                                            }}
                                                        />
                                                    </FormControl>

                                                </Grid>
                                                <Grid item>
                                                    <FormControl fullWidth className={classes.margin} variant="outlined">
                                                        <Controller
                                                            name="password"
                                                            as={
                                                                <TextField
                                                                    id="password"
                                                                    type="password"
                                                                    // labelWidth={70}
                                                                    helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
                                                                    variant="outlined"
                                                                    label="Password"
                                                                    error={fieldsErrors.password ? true : false}
                                                                />
                                                            }
                                                            control={control}
                                                            defaultValue=""
                                                            rules={{
                                                                required: 'Required'
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" type="submit" color="secondary">login {state.signIn.singInIsLoading ? <CircularProgress size={20} className={classes.loading} /> : ''}</Button>
                                                </Grid>
                                            </Grid>

                                        </form>
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
    signIn: ({ phone_number, password, sid }) => dispatch(actions.signIn({ phone_number, password, sid }))
});

SignIn.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));