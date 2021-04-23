import React, { Fragment, Component } from 'react';
import Menu from '../layout/partial/Menu';
import { contactUs } from './api';
import { getCompany } from '../company/api';
import { isAuthenticated } from "../auth/api";
import SuccessModal from '../modal/SuccessModal';
import ErrorModal from '../modal/ErrorModal';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';

class Contact extends Component {
    state = {
        company: '',
        subject: '',
        message: '',
        userId: '',
        loading: false,
        error: '',
        success: false,
        errorModal: false,
        successModal: false
    }

    componentDidMount() {
        const { user, token } = isAuthenticated();
        if (user) {
            getCompany(token).then(result => {
                this.setState({ userId: user._id, company: result.name })
            });
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value, error: false });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { company, subject, message, userId } = this.state;
        contactUs({ company, subject, message, userId }).then(data => {
            if (data.error) {
                this.setState({ error: data.error, success: false });
            } else {
                this.setState({
                    subject: '',
                    message: '',
                    error: '',
                    success: 'Thank you for contacting us. We will get back to you shortly.',
                    successModal: true
                });
            }
        });
    };

    handleReset = (event) =>{
        event.preventDefault()
        this.setState({
            subject: '',
            message: '',
            loading: false,
            error: '',
            success: false
        })
    }

    showLoader = () => (this.state.loading && <Loader />)
    showError = () => (this.state.error && <ErrorMessage message={this.state.error} />);
    showSuccess = () => (this.state.success && <SuccessMessage message={this.state.success} />);

    contactHtml = () => {
        const { company, subject, message, userId } = this.state;
        return (
            <div className="signup-wrapper">
                <div className="card bg-light mb-3 wrapper-box">
                    <div className="card-header"><h5>Contact Us</h5></div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label className="text-muted">Company</label>
                                <input
                                    type="text"
                                    onChange={this.handleChange('company')}
                                    className="form-control"
                                    value={company}
                                    readOnly={userId && true}
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-muted">Subject</label>
                                <input
                                    type="text"
                                    onChange={this.handleChange('subject')}
                                    className="form-control"
                                    value={subject}
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-muted">Message</label>
                                <textarea
                                    className="form-control"
                                    value={message}
                                    onChange={this.handleChange('message')}
                                    rows="4"
                                    cols="5"
                                />
                            </div>

                            <button onClick={this.handleSubmit} className="btn btn-primary">
                                Submit
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button onClick={this.handleReset} className="btn btn-danger">
                                Clear
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Fragment>
                <Menu />
                { this.showLoader() }
                {/* { this.showError() }
                { this.showSuccess() } */}
                {this.contactHtml()}

                { this.state.successModal && 
                    <SuccessModal
                        title="Success"
                        content= { this.state.success }
                        redirectUrl= {`/`}
                        isDisplay={this.state.successModal}
                    />
                }

                { this.state.errorModal && 
                    <ErrorModal
                        title="Error"
                        content= { this.state.error }
                        isDisplay={this.state.errorModal}
                        onSubmit={this.onClose}
                    />
                }
            </Fragment>
        )
    }
}

export default Contact;