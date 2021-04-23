import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import { getCategories, createProduct } from './api';
import { Loader } from '../loader/loader';
import SuccessModal from '../modal/SuccessModal';
import ErrorModal from '../modal/ErrorModal';

class AddProduct extends Component {
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
        error: false,
        success: false,
        formData: '',
        errorModal: false,
        successModal: false
    };

    componentDidMount() {
        this.getCategoryList(null)
    }

    // load categories and set form data
    getCategoryList = (parent = null) => {
        getCategories(this.props.token, parent).then(data => {
            if (!data) {
                this.setState({
                    error: data.error
                })
            } else {
                parent !== null ? 
                this.setState({
                    subCategories: data.result
                }) : 
                this.setState({ categories: data.result, formData: new FormData()});
            }
        });
    };

    handleChange = name => event => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        this.state.formData.set(name, value);
        this.setState({ [name]: value})

        if(name === 'categoryId') {
            this.getCategoryList(value)
        }
    };

    handleSubmit = event => {
        const {user, token } = this.props
        const { formData } = this.state

        event.preventDefault();
        this.setState({ error: '', loading: true });
        this.state.formData.set('userId', user._id)

        createProduct( formData, token)
        .then(result => {
            if (result.error) {
                this.setState({ loading: false, errorModal: true, error: result.error })
            } else {
                this.setState({
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
                    success: 'Product added successfully.',
                    successModal: true
                });
            }
        });
    }

    handleReset = (e) =>{
        e.preventDefault()
        this.state.formData.set('name', '');
        this.state.formData.set('description', '');
        this.state.formData.set('categoryId', '');
        this.state.formData.set('subCategoryId', '');

        // let categories = product.categories
        // let subCategories = product.subCategories

        this.setState({
            name: '',
            description: '',
            categories: [],
            subCategories: [],
            categoryId: '',
            subCategoryId: '',
            minQuantity: '',
            packagingDetail: '',
            deliveryTime: '',
            image: '',
            formData: new FormData()
        }, () => {
            this.getCategoryList()
        })
   
        // getCategoryList()

        // setProduct({
        // name: '',
        // description: '',
        // unitPrice: '',
        // categories: product.categories,
        // subCategories: product.subCategories,
        // categoryId: '',
        // subCategoryId: '',
        // minQuantity: '',
        // packagingDetail: '',
        // deliveryTime: '',
        // image: '',
        // loading: false,
        // error: '',
        // success: '',
        // formData: new FormData()
        // })

    }

    showLoader = () => ( this.state.loading && <Loader /> )

    addProductHtml = () => {
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
            packagingDetail
        } = this.state

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
                                        { this.showLoader() }
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">Product Name</label>
                                        <input type="name" onChange={this.handleChange('name')} className="form-control" value={name} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Category</label>
                                        <select defaultValue={categoryId} onChange={this.handleChange('categoryId')} className="form-control" >
                                            <option>Select Category</option>
                                            {categories &&
                                                categories.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                   
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Sub Category</label>
                                        <select defaultValue={subCategoryId} onChange={this.handleChange('subCategoryId')} className="form-control" defaultValue={subCategoryId}>
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
                                        <label htmlFor="inputAddress">Description</label>
                                        <textarea className="form-control" onChange={this.handleChange('description')} value={description}></textarea>
                                    </div>
                                   
                                </div>
                                <div className="form-row">
                                <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Min Quantity</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('minQuantity')} value={minQuantity}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Unit Price</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('unitPrice')} value={unitPrice}/>
                                    </div>
                                </div>
                             
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Packaging Detail</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('packagingDetail')} value={packagingDetail}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Delivery Time</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('deliveryTime')} value={deliveryTime}/>
                                    </div>
                                   
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="btn btn-secondary">
                                            <input onChange={this.handleChange('image')} type="file" name="image" accept="image/*" />
                                        </label>                    
                                    </div>
                                </div>

                                    <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Add Product</button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button onClick={this.handleReset} type="reset" className="btn btn-danger">Clear</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    onClose = () => {
        this.setState({errorModal: false, error: ''});
    }

    render() {
        return (
            <Layout>
                {this.addProductHtml()}

                { this.state.successModal && 
                    <SuccessModal
                        title="Success"
                        content= { this.state.success }
                        redirectUrl= {`/product`}
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
            </Layout>
        )
    }
}
    
export default AddProduct;