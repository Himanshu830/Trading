import React, { useState, useEffect, Component, Fragment } from 'react';
import Layout from '../layout/Layout';
import { Loader } from '../loader/loader';
import { getCompany, updateCompany } from './api';
import { arrayBufferToBase64 } from '../../utility/image';
import ErrorModal from '../modal/ErrorModal';
import SuccessModal from '../modal/SuccessModal';

class Company extends Component {
    state = {
        name: '',
        companyType: '',
        website: '',
        country: '',
        address: '',
        facebook: '',
        instagram: '',
        twitter: '',
        linkedIn: '',
        image: '',
        video: '',
        bio: '',
        formData: '',
        loading: false,
        error: '',
        success: '',
        errorModal: false,
        successModal: false
    }

    user = this.props.user;
    token = this.props.token;

    companyTypeList = [
        { _id: 1, name: 'Exporter' },
        { _id: 2, name: 'Importer' },
        { _id: 3, name: 'Trader' },
    ];

    getUserCompany = () => {
        getCompany(this.token).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false });
            } else {
                this.setState({
                    loading: false,
                    name: data.name,
                    companyType: data.companyType,
                    country: data.country,
                    userId: data.userId,
                    website: data.website,
                    address: data.address,
                    facebook: data.facebook,
                    twitter: data.twitter,
                    linkedIn: data.linkedIn,
                    instagram: data.instagram,
                    image: data.image,
                    video: data.video,
                    bio: data.bio,
                    formData: new FormData()
                })
            }

        }).catch(error => {
            console.log(error)
            this.setState({ error: 'Company not found.', loading: false })
        })
    }

    componentDidMount() {
        this.getUserCompany();
        this.setState({ country: this.user.country })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.success !== this.state.success) {
            this.getUserCompany();
        }
    }

    handleChange = name => event => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        this.state.formData.set(name, value);
        this.setState({ [name]: value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ error: '', loading: true });

        this.state.formData.set('userId', this.user._id);
        updateCompany(this.state.formData, this.token)
            .then(result => {
                if (result.error) {
                    this.setState({ loading: false, errorModal: true, error: result.error });
                } else {
                    this.setState({
                        loading: false,
                        success: 'Company updated successfully.',
                        successModal: true
                    });
                }
            });
    };

    showLoader = () => (this.state.loading && <Loader />)

    companyHtml = () => {
        const {
            name,
            companyType,
            website,
            address,
            country,
            facebook,
            instagram,
            twitter,
            linkedIn,
            image,
            bio,
        } = this.state;

        if (!this.user || !this.user._id) {
            return <div>Loading...</div>
        }
        // const { name, companyType, website, address, facebook, instagram, twitter, linkedIn, image, video, bio } = company;

        return (
            <div className="col-sm-9">
                <div className="card">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <span className="nav-link" to="/product"><strong>Update Company</strong></span>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="card-body">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    {this.showLoader()}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    {/* <label htmlFor="inputEmail4">Logo</label> */}
                                    {image && image.contentType && (
                                        <img
                                            height="35px"
                                            src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`}
                                            alt='company'
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Company Name</label>
                                    <input type="text" onChange={this.handleChange('name')} className="form-control" value={name} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Company Type</label>
                                    <select defaultValue={companyType} onChange={this.handleChange('companyType')} className="form-control">
                                        <option>Select Type</option>
                                        {this.companyTypeList &&
                                            this.companyTypeList.map((c) => (
                                                <option key={c._id} value={c._id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Website</label>
                                    <input type="text" onChange={this.handleChange('website')} className="form-control" value={website} />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Bio</label>
                                    <textarea rows={2} cols={10} className="form-control" onChange={this.handleChange('bio')} value={bio}></textarea>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Country</label>
                                    <input type="text" onChange={this.handleChange('country')} className="form-control" value={country} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Address</label>
                                    <input type="text" onChange={this.handleChange('address')} className="form-control" value={address} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Facebook</label>
                                    <input type="text" onChange={this.handleChange('facebook')} className="form-control" value={facebook} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Twitter</label>
                                    <input type="text" onChange={this.handleChange('twitter')} className="form-control" value={twitter} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">LinkedIn</label>
                                    <input type="text" onChange={this.handleChange('linkedIn')} className="form-control" value={linkedIn} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Instagram</label>
                                    <input type="text" onChange={this.handleChange('instagram')} className="form-control" value={instagram} />
                                </div>
                            </div>


                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="btn btn-secondary">
                                        <input onChange={this.handleChange('image')} type="file" name="image" accept="image/*" />
                                    </label>
                                </div>
                                {/* <div className="form-group col-md-6">
                                    <label className="btn btn-secondary">
                                        <input onChange={handleChange('video')} type="file" name="video" accept="video/*" />
                                    </label>
                                </div> */}
                            </div>

                            <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Update Company</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    onClose = () => {
        this.setState({errorModal: false, error: ''});
    }

    render() {
        return (
            <Layout>
                <Fragment>
                    { this.companyHtml()}
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
                
            </Layout>
        )
    };
}

export default Company;