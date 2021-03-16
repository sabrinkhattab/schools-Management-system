import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper, Avatar, TextField, Button } from '@material-ui/core';
import useStyles from './styles';
import backgroundImage from '../../assets/images/logo@2x.png'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { getItemFromLocalStorage } from '../../helpers/localStorage'
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";


function SignIn({ state, getschoolLoginData, location, signIn }) {
    const { register, handleSubmit } = useForm();
    const classes = useStyles();
    let history = useHistory();
    const [schoolId, setSchoolId] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });


    useEffect(() => {
        let schoolName = location.pathname.slice(4)
        setSchoolName(schoolName)
        getschoolLoginData(schoolName).then(res => {

        }).catch(err => console.log(err))
    }, [location]);

    const handleChange = (event) => {
        event.persist();

        setFormState((prevFormState) => ({
            ...prevFormState,
            values: {
                ...prevFormState.values,
                [event.target.name]: [event.target.value]
            },
            //   touched: {
            //     ...prevFormState.touched,
            //     [event.target.name]: true
            //   }
        }));
    };


    const onSubmit = data => {
        let sid = state.schoolLoginData.id
        let formData = { ...data, 'sid': sid }
        console.log(formData)
        signIn(formData).then(res => {
            history.push(`/sc/${schoolName}/dashboard`)
        }).catch(err => {
            console.log('err', err)

        })
    };
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
                                                    <TextField
                                                        name='phone_number'
                                                        label="email or phone"
                                                        variant="outlined"
                                                        color="secondary"
                                                        required={true}
                                                        type='textField'
                                                        value={formState.values.phone_number || ''}
                                                        onChange={handleChange}
                                                        inputRef={register({ required: true })}
                                                    />

                                                </Grid>
                                                <Grid item>
                                                    <TextField
                                                        name='password'
                                                        label="password"
                                                        variant="outlined"
                                                        color="secondary"
                                                        type='password'
                                                        value={formState.values.password || ''}
                                                        onChange={handleChange}
                                                        inputRef={register({ required: true })}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" type="submit" color="secondary">login</Button>
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