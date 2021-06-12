import React, { Fragment, useEffect, useState } from 'react';
import Menu from '../layout/partial/Menu';
import { reset, resetPassword } from '../auth/api';
import { Loader } from '../loader/loader';
import SuccessModal from '../modal/SuccessModal';
import ErrorModal from '../modal/ErrorModal';

import './auth.css';

const ResetPassword = ({match}) => {
    const [values, setValues] = useState({
        password: '',  
        confirmPassword: '',
        loading: false,
        error: '',
        success: '',
        errorModal: false,
        successModal: false
    });

    const { token } = match.params;
    const { password, confirmPassword, loading } = values;

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
            setValues({ ...values, errorModal: true, error: 'Password and confirm password must be same'})
            return false;
        } else if( password.length < 6) {
            setValues({ ...values, errorModal: true, error: 'Password must be atleast 6 character.'})
            return false;
        } else if (password.search(/[0-9]/) < 0) {
            setValues({ ...values, errorModal: true, error: 'Password must contain a number'})
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
                    return setValues({ ...values, loading: false, errorModal: true, error: data.error });
                } else if(!data.success) {
                    return setValues({ ...values, loading: false, errorModal: true, error: data.message });
                } else {
                    setValues({
                        ...values,
                        loading: false,
                        error: '',
                        success: 'Your password has been updated. Please Signin.',
                        successModal: true
                    });
                }
            }).catch(error => {
                setValues({ ...values, errorModal: true, error: error.message, success: false });
            });
        }
    };

    const showLoader = () => ( loading && <Loader /> )

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

    const onClose = () => {
        setValues({...values, errorModal: false, error: ''});
    }

    return (
        <Fragment>
            <Menu />
            { showLoader() }
            { resetPasswordForm() }

            { values.successModal && 
                <SuccessModal
                    title="Success"
                    content= { values.success }
                    redirectUrl= {`/signin`}
                    isDisplay={values.successModal}
                />
            }

            { values.errorModal && 
                <ErrorModal
                    title="Error"
                    content= { values.error }
                    isDisplay={values.errorModal}
                    onSubmit={onClose}
                />
            }
        </Fragment>
    )
};

export default ResetPassword;