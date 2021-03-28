import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';
import { getCompany, updateCompany } from './api';

const Company = ({ user, token }) => {
    const [company, setCompany] = useState({
        name: '',
        companyType: '',
        website: '',
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
        success: ''
    });

    const companyTypeList = [
        {_id: 1, name: 'Exporter'},
        {_id: 2, name: 'Importer'},
        {_id: 3, name: 'Trader'},
    ];

    const { name, companyType, website, address, facebook, instagram, twitter, linkedIn, bio, image, video, formData } = company;

    useEffect(() => {
        getCompany(token).then(data => {
            if(data.error) {
                setCompany({ ...company, error: data.error });
            } else {
                setCompany({
                    ...company,
                    name: data.name,
                    companyType: data.companyType,
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
        })
    }, [])

    const handleChange = name => event => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setCompany({ ...company, [name]: value, error: false });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setCompany({ ...company, error: '', loading: true });
        formData.set('userId', user._id);

        updateCompany( formData, token)
        .then(result => {
            if (result.error) {
                setCompany({...company, loading: false, error: result.error });
            } else {
                setCompany({
                    ...result,
                    loading: false,
                    success: 'Company updated successfully.'
                });
            }
        });
    };

    const showLoader = () => ( company.loading && <Loader /> )
    const showError = () => ( company.error && <ErrorMessage message={ company.error} /> );
    const showSuccess = () => ( company.success && <SuccessMessage message={company.success} /> );

    const companyHtml = () => {
        if(!company || !company.userId) {
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
                                    { showLoader() }
                                    { showError() }
                                    { showSuccess() }
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Name</label>
                                    <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Company Type</label>
                                    <select defaultValue={companyType} onChange={handleChange('companyType')} className="form-control">
                                        <option>Select Type</option>
                                        {companyTypeList &&
                                            companyTypeList.map((c) => (
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
                                    <input type="text" onChange={handleChange('website')} className="form-control" value={website} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Address</label>
                                    <input type="text" onChange={handleChange('address')} className="form-control" value={address} />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Facebook</label>
                                    <input type="text" onChange={handleChange('facebook')} className="form-control" value={facebook} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Twitter</label>
                                    <input type="text" onChange={handleChange('twitter')} className="form-control" value={twitter} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">LinkedIn</label>
                                    <input type="text" onChange={handleChange('linkedIn')} className="form-control" value={linkedIn} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Instagram</label>
                                    <input type="text" onChange={handleChange('instagram')} className="form-control" value={instagram} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputPassword4">Bio</label>
                                    <textarea rows={2} cols={10} className="form-control" onChange={handleChange('bio')} value={bio}></textarea>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="btn btn-secondary">
                                        <input onChange={handleChange('image')} type="file" name="image" accept="image/*" />
                                    </label>
                                </div>
                                {/* <div className="form-group col-md-6">
                                    <label className="btn btn-secondary">
                                        <input onChange={handleChange('video')} type="file" name="video" accept="video/*" />
                                    </label>
                                </div> */}
                            </div>

                            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Update Company</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Layout>
            { companyHtml() }
        </Layout>
    )
};

export default Company;