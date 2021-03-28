import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../layout/partial/Menu';
import { signup } from './api';
import validator from 'validator';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';
import Popup from '../modal/Popup';

import './auth.css';

class Signup  extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        tc: false,
        loading: false,
        isDisabled: true,
        error: '',
        success: false
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value, error: false });
    };

    handleBlur = (event) => {
        const { email, password, confirm_password } = this.state;
        if (password && confirm_password && password !== confirm_password) {
            this.setState({ error: 'Password not matched.', success: false });
        }
        if(email && !validator.isEmail(email)) {
            this.setState({ error: 'Please Enter valid email.', success: false });
        }
        this.verifySingupButton()
    };

    verifySingupButton = () => {
        const { name, email, password, tc } = this.state;
        if (name && email && password && tc) {
            this.setState({ isDisabled: false })
        } else {
            this.setState({ isDisabled: true })
        }
        console.log(this.state)
    }

    handleCheckBox = (event) => {
        this.setState({ tc: event.target.checked }, () => {
            this.verifySingupButton()
            console.log(this.state)
        })
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { name, email, password } = this.state;
        signup({ name, email, password }).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading:false, success: false });
            } else {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                    loading:false,
                    error: '',
                    tc: false,
                    success: 'Account created successfully.',
                    isDisabled: true
                });
            }
        });
    };

    showLoader = () => ( this.state.loading && <Loader /> )
    showError = () => ( this.state.error && <ErrorMessage message={this.state.error} /> );
    showSuccess = () => (this.state.success && <SuccessMessage message={this.state.success} /> );

    signupHtml = () => {
        const { name, email, password, confirm_password, tc, isDisabled } = this.state;

        return (
            <div className="signup-wrapper">
                <div className="card bg-light mb-3 wrapper-box">
                    <div className="card-header"><h5>Sign Up</h5></div>
                    <div className="card-body">
                        <form>                            
                            <div className="form-group">
                                <input onBlur={this.handleBlur} onChange={this.handleChange('name')} value={name} type="text" className="form-control" placeholder="Name" />
                            </div>
                            <div className="form-group">
                            <input onBlur={this.handleBlur} onChange={this.handleChange('email')} value={email} type="email" className="form-control" placeholder="Email"  />
                            </div>
                            <div className="form-group">
                                <input onBlur={this.handleBlur} onChange={this.handleChange('password')} value={password} type="password" className="form-control" placeholder="Password" />
                            </div>
                            <div className="form-group">
                            <input onBlur={this.handleBlur} onChange={this.handleChange('confirm_password')} value={confirm_password} type="password" className="form-control" placeholder="Confirm Password" />
                            </div>
                            <div className="form-check mb-3">
                              <input type="checkbox" checked={tc} onChange={this.handleCheckBox}  />
                                {/* <Link to="term-and-conditions" className="form-check-label">&nbsp; Term & Conditions</Link> */}
                                <span
                                    data-toggle="modal" 
                                    data-target="#exampleModalLong"
                                    style={{ cursor: "pointer" }}
                                    className="form-check-label text-primary">&nbsp; Term & Conditions</span>
                            </div>
                            <div className="form-group">
                                <button onClick={this.clickSubmit} disabled={isDisabled} type="submit" className="btn btn-outline-primary w-100">Sign Up</button>
                            </div>
                            <small>Already have an account? </small><Link to="/signin">Signin</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    tCContent = () => {
        return (
            <Fragment>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                <Menu />
                { this.showLoader() }
                { this.showError() }
                { this.showSuccess() }
                { this.signupHtml()}
                <Popup 
                    title="Term & Condition"
                    content= {this.tCContent()}
                    onSubmit={() => this.onOrderDelete() }
                    onCancel={() => {}}
                />
            </Fragment>
        )
    }
}

export default Signup;