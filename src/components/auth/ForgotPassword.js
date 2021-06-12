import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../layout/partial/Menu';
import { recoverPassword } from '../auth/api';
import { Loader } from '../loader/loader';
import SuccessModal from '../modal/SuccessModal';
import ErrorModal from '../modal/ErrorModal';

import './auth.css';

const ForgotPassword = () => {  
    const [values, setValues] = useState({
        email: '',
        loading: false,
        error: '',
        success: '',
        errorModal: false,
        successModal: false
    });

    const { email, loading } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, loading: true, error: false });
        recoverPassword(email).then(data => {
            console.log(data)
            if (data.error) {
                return setValues({ ...values, loading: false, errorModal: true, error: data.error });
            } else if(!data.success) {
                return setValues({ ...values, loading: false, errorModal: true, error: data.message });
            } else {
                setValues({
                    ...values,
                    email: '',
                    loading: false,
                    error: '',
                    success: 'Password reset link has been sent on your email.',
                    successModal: true
                });
            }
        });
    };

    const showLoader = () => ( loading && <Loader /> )

    const forgotPasswordHtml = () => (
        <div className="login-wrapper">
            <div className="card bg-light mb-3 wrapper-box">
                <div className="card-header"><h5>Forgot Password</h5></div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                onChange={handleChange('email')}
                                value={values.email}
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                            />
                        </div>
                        
                        <div className="form-group">
                            <button onClick={handleSubmit} className="btn btn-outline-primary w-100">Reset Password</button>
                        </div>
                        <div className="text-center">
                            <small>or </small><Link to="/signin">Login</Link>
                        </div>
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
            { forgotPasswordHtml() }

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

export default ForgotPassword;