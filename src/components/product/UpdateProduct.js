import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../layout/Layout';
import { getCategories, getProductById, updateProduct } from './api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';
import { arrayBufferToBase64 } from '../../utility/image';

class UpdateProduct extends Component {
    state = {
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
    }

    user = this.props.user;
    token = this.props.token;
    productId = this.props.match.params.productId;

    componentDidMount() {
        this.getCategoryList(null);

        getProductById(this.productId, this.token).then(product => {
            let data = product.result;

            let categoryId = (data.categoryId) ? data.categoryId._id : '';
            let subCategoryId = (data.subCategoryId) ? data.subCategoryId._id : '';
            this.setState({
                name: data.name,
                description: data.description,
                unitPrice: data.unitPrice,
                categoryId: categoryId,
                subCategoryId: subCategoryId,
                minQuantity: data.minQuantity,
                packagingDetail: data.packagingDetail,
                deliveryTime: data.deliveryTime,
                image: data.image
            });

            this.getCategoryList(data.categoryId)
        }).catch(error => {
            console.log(error)
            this.setState({ error: 'Product not found.'})
        })
    }

    getCategoryList = (parent = null) => {
        getCategories(this.token, parent).then(data => {
            if (!data) {
                this.setState({error: data.error})
            } else {
                parent !== null ? 
                this.setState({ subCategories: data.result}) :
                this.setState({ categories: data.result, formData: new FormData() });
            }
        });
    };

    handleChange = name => event => {
        // const { value } = event.target;
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        this.state.formData.set(name, value);
        this.setState({ [name]: value });
        if (name === 'categoryId') {
            this.getCategoryList(value)
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ error: '', loading: true });
        // this.state.formData.set('userId', this.user._id)
        updateProduct(this.productId, this.state.formData, this.token)
        .then(result => {
            if (result.error) {
                this.setState({ loading: false, error: result.error });
            } else {
                this.setState({
                    loading: false,
                    success: 'Product updated successfully.'
                });
            }
        });
    };
    
    showLoader = () => ( this.state.loading && <Loader /> )
    showError = () => ( this.state.error && <ErrorMessage message={ this.state.error} /> );
    showSuccess = () => ( this.state.success && <SuccessMessage message={this.state.success} /> );

    updateProductHtml = () => {
        const {
            name,
            description,
            unitPrice,
            categories,
            subCategories,
            categoryId,
            subCategoryId,
            minQuantity,
            packagingDetail,
            deliveryTime,
            image,
            loading,
            error,
            success,
            formData
        } = this.state;

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
                                        <Link className="nav-link" to="/product"><strong>Update Products</strong></Link>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                        <div className="card-body">
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        { this.showLoader() }
                                        { this.showError() }
                                        { this.showSuccess() }
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">Name</label>
                                        <input type="name" onChange={this.handleChange('name')} className="form-control" value={name} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Min Quantity</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('minQuantity')} value={minQuantity}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Category</label>
                                        <select onChange={this.handleChange('categoryId')} className="form-control" value={categoryId}>
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
                                        <input type="text" className="form-control" onChange={this.handleChange('unitPrice')} value={unitPrice}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Sub Category</label>
                                        <select onChange={this.handleChange('subCategoryId')} className="form-control" value={subCategoryId}>
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
                                        <input type="text" className="form-control" onChange={this.handleChange('deliveryTime')} value={deliveryTime}/>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Packaging Detail</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('packagingDetail')} value={packagingDetail}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputAddress">Description</label>
                                        <textarea className="form-control" onChange={this.handleChange('description')} value={description}></textarea>
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="btn btn-secondary">
                                            <input onChange={this.handleChange('image')} type="file" name="image" accept="image/*" />
                                        </label>
                                        {image && (
                                            <img 
                                            height="35px"
                                            src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`} 
                                            alt='product' 
                                        />
                                        )}
                                    </div>
                                    {/* <div className="form-group col-md-6">
                                        <label className="btn btn-secondary">
                                            <input onChange={this.handleChange('image')} type="file" name="image" accept="image/*" />
                                        </label>             
                                    </div> */}
                                </div>

                                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Add Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    render() {
        return (
            <Layout>
                {this.updateProductHtml()}
            </Layout>
        );
    }

}

export default UpdateProduct;