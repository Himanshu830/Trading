import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../layout/Layout';
import { getCategories, createProduct } from './api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';

const AddProduct = ({ user, token }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        unitPrice: '',
        categories: [],
        subCategories: [],
        categoryId: '',
        subCategoryId: '',
        minQuantity: '',
        packagingDetail: '',
        deliveryTime: '',
        image: '',
        loading: false,
        error: '',
        success: '',
        formData: ''
    });

    const {
        name,
        description,
        unitPrice,
        categories,
        subCategories,
        categoryId,
        subCategoryId,
        minQuantity,
        deliveryTime,
        packagingDetail,
        image,
        loading,
        error,
        success,
        formData
    } = product;

    // load categories and set form data
    const getCategoryList = (parent = null) => {
        getCategories(token, parent).then(data => {
            if (!data) {
                setProduct({ ...product, error: data.error });
            } else {
                parent !== null ? 
                setProduct({ ...product, subCategories: data.result}) :
                setProduct({ ...product, categories: data.result, formData: new FormData() });
            }
        });
    };

    useEffect(() => {
        getCategoryList(null);
    }, [])

    const handleChange = name => event => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setProduct({ ...product, [name]: value });

        if(name === 'categoryId') {
            getCategoryList(value)
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        setProduct({ ...product, error: '', loading: true });
        formData.set('userId', user._id)

        createProduct( formData, token)
        .then(result => {
            if (result.error) {
                setProduct({...product, loading: false, error: result.error });
            } else {
                setProduct({
                    ...result,
                    name: '',
                    description: '',
                    unitPrice: '',
                    subCategories: [],
                    categoryId: '',
                    subCategoryId: '',
                    minQuantity: '',
                    packagingDetail: '',
                    deliveryTime: '',
                    image: '',
                    loading: false,
                    success: 'Product added successfully.'
                });
            }
        });
    }

    const showLoader = () => ( loading && <Loader /> )
    const showError = () => ( error && <ErrorMessage message={ error} /> );
    const showSuccess = () => ( success && <SuccessMessage message={success} /> );

    const addProductHtml = () => {
        if (success) {
            return <Redirect to="/product" message={success} />;
        }

        return (
            <Fragment>
                <div className="col-sm-9">
                    <div className="card">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/product"><strong>Add New Products</strong></Link>
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
                                        <input type="name" onChange={handleChange('name')} className="form-control" value={name} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Min Quantity</label>
                                        <input type="text" className="form-control" onChange={handleChange('minQuantity')} value={minQuantity}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Category</label>
                                        <select defaultValue={categoryId} onChange={handleChange('categoryId')} className="form-control" defaultValue={categoryId}>
                                            <option>Select Category</option>
                                            {categories &&
                                                categories.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Unit Price</label>
                                        <input type="text" className="form-control" onChange={handleChange('unitPrice')} value={unitPrice}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Sub Category</label>
                                        <select defaultValue={subCategoryId} onChange={handleChange('subCategoryId')} className="form-control" defaultValue={subCategoryId}>
                                            <option value="">Select Sub-category</option>
                                            {subCategories &&
                                                subCategories.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Delivery Time</label>
                                        <input type="text" className="form-control" onChange={handleChange('deliveryTime')} value={deliveryTime}/>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Packaging Detail</label>
                                        <input type="text" className="form-control" onChange={handleChange('packagingDetail')} value={packagingDetail}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputAddress">Description</label>
                                        <textarea className="form-control" onChange={handleChange('description')} vlaue={description}></textarea>
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="btn btn-secondary">
                                            <input onChange={handleChange('image')} type="file" name="image" accept="image/*" />
                                        </label>                    
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="btn btn-secondary">
                                            <input onChange={handleChange('image')} type="file" name="image" accept="image/*" />
                                        </label>             
                                    </div>
                                </div>

                                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Layout>
            {addProductHtml()}
        </Layout>
    )
}

export default AddProduct;