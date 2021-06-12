import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../layout/partial/Menu';
import { signup } from './api';
import validator from 'validator';
import { Loader } from '../loader/loader';
import Popup from '../modal/Popup';
import SuccessModal from '../modal/SuccessModal';
import ErrorModal from '../modal/ErrorModal';
import { CountryList } from '../constant';

import './auth.css';

class Signup  extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        country: '',
        tc: false,
        loading: false,
        isDisabled: true,
        error: '',
        success: false,
        errorModal: false,
        successModal: false
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value, error: false });
    };

    handleBlur = () => {
        const { email, password, confirm_password } = this.state;
        if (password && confirm_password && password !== confirm_password) {
            this.setState({ errorModal: true, error: 'Password not matched.', success: false });
        }
        if(email && !validator.isEmail(email)) {
            this.setState({ errorModal: true, error: 'Please Enter valid email.', success: false });
        }

        this.verifySingupButton()
    };

    handleCountry = () => {
        if(!this.state.country) {
            this.setState({ errorModal: true, error: 'Please Select country.', success: false });
        }
        this.verifySingupButton();
    }

    verifySingupButton = () => {
        if (!this.state.error && this.state.tc && this.state.country) {
            this.setState({ isDisabled: false })
        } else {
            this.setState({ isDisabled: true })
        }
        console.log(this.state)
    }

    handleCheckBox = (event) => {
        console.log(event.target.checked)
        this.setState({ tc: event.target.checked }, () => {
            this.verifySingupButton()
            console.log(this.state)
        })
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { name, email, password, country } = this.state;
        signup({ name, email, password, country }).then(data => {
            if (data.error) {
                console.log(data.error)
                this.setState({ errorModal: true, error: data.error, loading:false, success: false });
                console.log('Error occurred.')
            } else {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                    country: '',
                    loading:false,
                    error: '',
                    tc: false,
                    success: 'Thanks for signing up with us. Your account was created successfully. Kindly activate the account by clicking on the link sent to your email.',
                    isDisabled: true,
                    successModal: true
                });                
            }
        });  
    };

    showLoader = () => ( this.state.loading && <Loader /> )

    signupHtml = () => {
        const { name, email, password, confirm_password, country, tc, isDisabled } = this.state;

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
                            <div className="form-group">
                                <select onBlur={this.handleCountry} defaultValue={country} onChange={this.handleChange('country')} className="form-control">
                                    <option>Select Country</option>
                                    {Object.values(CountryList).map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
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
            </Fragment>
        )
    }

    onClose = () => {
        this.setState({errorModal: false, error: ''});
    }

    render() {
        return (
            <Fragment>
                <Menu />
                { this.showLoader() }
                { this.signupHtml()}
                <Popup 
                    title="Term & Condition"
                    content= {this.tCContent()}
                    onSubmit={() => this.onOrderDelete() }
                    onCancel={() => {}}
                />

                { this.state.successModal && 
                    <SuccessModal
                        title="Success"
                        content= { this.state.success }
                        redirectUrl= {`/signin`}
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

export default Signup;