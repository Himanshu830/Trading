import React, { Fragment, useState, useEffect } from 'react';
import Menu from '../layout/partial/Menu';
import { activateAccount } from '../auth/api';
import { Loader } from '../loader/loader';
import SuccessModal from '../modal/SuccessModal';
import ErrorModal from '../modal/ErrorModal';

import './auth.css';

const AccountActivation = ({match}) => {
    const [values, setValues] = useState({
        loading: false,
        error: '',
        success: '',
        errorModal: false,
        successModal: false
    });

    const { token } = match.params;
    useEffect(() => {
        // setValues({ ...values, loading: false, success: 'Your account has been activated. Please Singin.' });

        activateAccount(token).then(data => {
            if (data.error) {
                setValues({ ...values, loading: false, errorModal: true, error: data.error });
            } else {
                setValues({ ...values, loading: false, successModal: true, success: 'Your account has been activated. Please Singin.' });
            }
        }).catch(err => {
            console.log(err)
            setValues({ ...values, loading: false, errorModal: true, error: err.message });
        });
    }, []);

    const showLoader = () => ( values.loading && <Loader /> )

    const onClose = () => {
        setValues({...values, errorModal: false, error: ''});
    }

    return (
        <Fragment>
            <Menu />
            { showLoader() }

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

export default AccountActivation;