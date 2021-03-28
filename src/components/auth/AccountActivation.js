import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../layout/partial/Menu';
import { activateAccount } from '../auth/api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';

import './auth.css';

const AccountActivation = ({match}) => {
    const [values, setValues] = useState({
        loading: false,
        error: '',
        success: ''
    });

    const { token } = match.params;
    useEffect(() => {
        // setValues({ ...values, loading: false, success: 'Your account has been activated. Please Singin.' });

        activateAccount(token).then(data => {
            if (data.error) {
                setValues({ ...values, loading: false, error: data.error });
            } else {
                setValues({ ...values, loading: false, success: 'Your account has been activated. Please Singin.' });
            }
        }).catch(err => {
            console.log(err)
        });
    }, []);

    const { loading, error, success } = values;

    const showLoader = () => ( loading && <Loader /> )
    const showError = () => ( error && <ErrorMessage message={ error} /> );
    const showSuccess = () => ( success && <SuccessMessage message={success} /> );

    return (
        <Fragment>
            <Menu />
            { showLoader() }
            { showError() }
            { showSuccess() }
        </Fragment>
    )
};

export default AccountActivation;