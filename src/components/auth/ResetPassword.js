import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../layout/partial/Menu';
import { reset, resetPassword } from '../auth/api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';

import './auth.css';

const ResetPassword = ({match}) => {
    const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
        loading: false,
        error: '',
        success: ''
    });

    const { token } = match.params;
    const { password, confirmPassword, loading, error, success } = values;

    useEffect(() => {
        reset(token).then(data => {
            if (data.error) {
                setValues({ ...values, loading: false, error: data.error });
            } else {
                setValues({ ...values, loading: false, password: '', confirmPassword: '' });
            }
        }).catch(err => {
            console.log(err)
        });
    }, []);

    const validatePassword = () => {
        if(password !== confirmPassword) {
            setValues({ ...values, error: 'Password and confirm password must be same'})
            return false;
        } else if( password.length < 7) {
            setValues({ ...values, error: 'Password must be atleast 7 character.'})
            return false;
        } else if (password.search(/[0-9]/) < 0) {
            setValues({ ...values, error: 'Password must contain a number'})
            return false;
        }

        setValues({ ...values, error: ''})
        return true;
    }

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        if(validatePassword()) {
            resetPassword(token, password).then( data => {
                if (data.error) {
                    return setValues({ ...values, loading: false, error: data.error });
                } else if(!data.success) {
                    return setValues({ ...values, loading: false, error: data.message });
                } else {
                    setValues({
                        ...values,
                        loading: false,
                        error: '',
                        success: 'Your password has been updated. Please Signin.'
                    });
                }
            }).catch(error => {
                setValues({ ...values, error: error.message, success: false });
            });
        }
    };

    const showLoader = () => ( loading && <Loader /> )
    const showError = () => ( error && <ErrorMessage message={ error} /> );
    const showSuccess = () => ( success && <SuccessMessage message={success} /> );

    const resetPasswordForm = () => (
        <div className="login-wrapper">
            <div className="card bg-light mb-3 wrapper-box">
                <div className="card-header"><h5>Forgot Password</h5></div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <input 
                                type="password"
                                onChange={handleChange('password')}
                                value={password}
                                className="form-control"
                                placeholder="Password"
                            />
                        </div>
                        
                        <div className="form-group">
                            <input 
                                type="password"
                                onChange={handleChange('confirmPassword')}
                                value={confirmPassword}
                                className="form-control"
                                placeholder="Confirm password"
                            />
                        </div>
                        
                        <div className="form-group">
                            <button onClick={handleSubmit} className="btn btn-outline-primary w-100">Submit</button>
                        </div>
                        {/* <div className="text-center">
                            <small>or </small><Link to="/signin">Login</Link>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <Fragment>
            <Menu />
            { showLoader() }
            { showError() }
            { showSuccess() }
            { resetPasswordForm() }
        </Fragment>
    )
};

export default ResetPassword;