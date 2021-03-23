import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Grid,
    TextField,
    Button,
    CircularProgress,
} from '@material-ui/core';
import useStyles from './styles';
import validate from 'validate.js';
import { isValidPhoneNumber } from 'libphonenumber-js/mobile'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';


const schema = {
    password: {
        presence: { allowEmpty: false, message: 'is required' }
    },
    user: {
        presence: { allowEmpty: false, message: 'is required' },
        custom: {
            phoneMessage: "invalid phone",
            emailMessage: 'invalid email',
            message: 'is required'
        },

    }
};



const LoginForm = ({ schoolId, signIn, schoolName, state }) => {
    const { addToast } = useToasts();
    const classes = useStyles();
    let history = useHistory();
    const { handleSubmit, register } = useForm();
    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        errors: {},
        touched: {},
    })

    const [isNumber, setIsNumber] = useState(false)

    const onChange = (event) => {
        event.persist();
        setFormState((prevFormState) => ({
            ...prevFormState,
            values: {
                ...prevFormState.values,
                [event.target.name]: event.target.value
            },
            touched: {
                ...prevFormState.touched,
                [event.target.name]: true
            }

        }));

    }

    const checkIfInputIsNumberOrNot = (input) => {
        let isNum = /^\d+$/.test(input);
        return isNum;
    }

    const validateEmail = (email) => {
        let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        return regex.test(email)
    }

    const validateCountryPhoneNumber = (phone, code) => {
        const isValidPhone = isValidPhoneNumber(phone, code)
        return isValidPhone
    }

    const hasError = (field) => ((formState.touched[field] && formState.errors[field]) ? true : false);

    validate.validators.custom = function (value, options, key, attributes) {
        if (checkIfInputIsNumberOrNot(value)) {
            if (validateCountryPhoneNumber(value, 'EG')) return null
            else return options.phoneMessage
        } else {
            if (validateEmail(value)) return null
            else return options.emailMessage
        }
    };


    useEffect(() => {
        setIsNumber(checkIfInputIsNumberOrNot(formState.values.user))
        const errors = validate(formState.values, schema);

        setFormState((prevFormState) => ({
            ...prevFormState,
            isValid: !errors,
            errors: errors || {}

        }));
    }, [formState.values])

    const onSubmit = (data) => {
        let formData = { phone_number: data.user, password: data.password, 'sid': schoolId }
        signIn(formData).then(res => {
            history.push(`/sc/${schoolName}/dashboard`)
            addToast('successfully logged in', { appearance: 'success', autoDismiss: true });
        }).catch(err => {
            addToast(err.response.data.detail, { appearance: 'error', autoDismiss: true });
            console.log('err', Object.keys(err))
            console.log('err', err.response.data.detail)

        })
        console.log(data)
    }



    return (
        <>
            <form className={classes.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" spacing={2} alignItems="center" justify="center">
                    <Grid item lg={12}>
                        <Grid container >
                            <Grid item lg={12}>
                                <TextField
                                    inputRef={register}
                                    name="user"
                                    defaultValue={formState.values.user}
                                    onChange={onChange}
                                    variant="outlined"
                                    helperText={
                                        hasError('user') ? formState.errors.user[0] : null
                                    }
                                    error={hasError('user')}
                                    label="user"
                                    autoComplete="off"
                                />
                            </Grid>
                            {/* <Grid item lg={4}>
                                <CountrySelector />
                            </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            name="password"
                            type="password"
                            helperText={
                                hasError('password') ? formState.errors.password[0] : null
                            }
                            variant="outlined"
                            label="Password"
                            error={hasError('password')}
                            inputRef={register}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" type="submit" color="secondary" disabled={!formState.isValid}>login {state.signIn.singInIsLoading ? <CircularProgress size={20} className={classes.loading} /> : ''}
                        </Button>
                    </Grid>
                </Grid>

            </form>

        </>
    )
}

LoginForm.propTypes = {
    schoolId: PropTypes.number
}

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
    signIn: ({ phone_number, password, sid }) => dispatch(actions.signIn({ phone_number, password, sid }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));