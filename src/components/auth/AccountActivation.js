import React, { Fragment, Component } from 'react';
import Menu from '../layout/partial/Menu';
import { activateAccount } from '../auth/api';
import { Loader } from '../loader/loader';
import SuccessModal from '../modal/SuccessModal';
import ErrorModal from '../modal/ErrorModal';

import './auth.css';

class AccountActivation extends Component {
    state = {
        loading: false,
        error: '',
        success: false,
        errorModal: false,
        successModal: false
    }

    componentDidMount() {
        const { token } = this.props.match.params;
        activateAccount(token).then(data => {
            console.log(data)
            if (data.error) {
                this.setState({ loading: false, errorModal: true, error: data.error });
            } else {
                this.setState({ loading: false, successModal: true, success: 'Your account has been activated. Please Singin.' });
            }
        }).catch(err => {
            console.log(err)
            this.setState({ loading: false, errorModal: true, error: err.message });
        });
    }

    showLoader = () => ( this.state.loading && <Loader /> )

    onClose = () => {
        this.setState({errorModal: false, error: ''});
    }

    render() {
        const { errorModal, successModal, error, success } = this.state
        return (
            <Fragment>
                <Menu />
                { this.showLoader() }

                { successModal && 
                    <SuccessModal
                        title="Success"
                        content= { success }
                        redirectUrl= {`/signin`}
                        isDisplay={successModal}
                    />
                }

                { errorModal && 
                    <ErrorModal
                        title="Error"
                        content= { error }
                        isDisplay={errorModal}
                        onSubmit={this.onClose}
                    />
                }
            </Fragment>
        )
    }
}

export default AccountActivation;