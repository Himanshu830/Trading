import React, { Fragment, Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import Menu from '../layout/partial/Menu';
import { signin, authenticate, isAuthenticated } from "../auth/api";
import { Loader } from '../loader/loader';
import ErrorModal from '../modal/ErrorModal';

import './auth.css';

class Signin extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        errorModal: false,
        successModal: false,
        rememberMe: false,
        loading: false,
        redirectToReferrer: false,
        user: {}
    };

    // const { email, password, loading, error, rememberMe, redirectToReferrer } = values;
    // const { user } = isAuthenticated();

    componentDidMount() {
        const { user } = isAuthenticated();
        this.setState({user})
        if(!user && localStorage.rememberMe && localStorage.email !== '') {
            this.setState({
                email: localStorage.email,
                password: localStorage.password,
                rememberMe: true
            })
        }
    }

    // componentDidUpdate(preProps, preState) {
    //     if(this.state.rememberMe !== preState.rememberMe) {
    //         this.setState({rememberMe: this.state.rememberMe})
    //     }
    // }

    handleChange = name => event => {
        this.setState({ error: false, [name]: event.target.value });
    };

    toggleRememberMe = (event) => {
        this.setState({rememberMe: event.target.checked}, () => {
            console.log(this.state.rememberMe)
        })
    }

    formSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true, error: false });

        const { email, password, rememberMe } = this.state;
        signin({ email, password }).then(data => {
            if (data.error) {
                this.setState({ errorModal: true, error: data.error, loading: false });
            } else {
                this.setState({user: data.user})
                if(rememberMe) {
                    localStorage.email = email
                    localStorage.password = password
                    localStorage.rememberMe = rememberMe
                } else {
                    localStorage.clear();
                }
                authenticate(data, () => {
                    this.setState({
                        email,
                        password,
                        rememberMe,
                        loading: false,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    signinHtml = () => {
        const { email, password, rememberMe } = this.state;

        return (
            <div className="login-wrapper">
                <div className="card bg-light mb-3 wrapper-box">
                    <div className="card-header"><h5>Log In</h5></div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <input type="email" onChange={this.handleChange("email")} value={email} className="form-control" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={this.handleChange("password")} value={password} className="form-control" placeholder="Password" />
                            </div>
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" onChange={this.toggleRememberMe} checked={rememberMe} placeholder="Remember Me" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                            </div>
                            <div className="form-group">
                                <button type="submit" onClick={this.formSubmit} className="btn btn-outline-primary w-100" data-toggle="modal" data-target=".modal">Login</button>
                            </div>
                            <div className="text-center">
                                <small>or </small><Link to="/forgot-password">Forgot Password</Link>
                                <br />
                                <small>Don't have account? </small><Link to="/signup">Sing Up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    showLoader = () => ( this.state.loading && <Loader /> )

    redirectUser = () => {
        const { user } = this.state
        if (this.state.redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }

        const isLoginUser = isAuthenticated();
        if (isLoginUser) {
            let redirectTo = isLoginUser.role === 1 ? 'admin/dashboard' : '/user/dashboard';
            return <Redirect to={redirectTo} />;
        }
    };

    render() {
        return (
            <Fragment>
                <Menu />
                { this.showLoader() }
                { this.signinHtml() }
                { this.redirectUser() }


                { this.state.errorModal && 
                    <ErrorModal
                        title="Authentication failed"
                        content= { this.state.error }
                        isDisplay={this.state.errorModal}
                    />
                }
            </Fragment>
        )
    }
};

export default Signin;