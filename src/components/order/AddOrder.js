import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../layout/Layout';
import { getCategories, createOrder } from './api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';

class AddOrder extends Component {
    state = {
        title: '',
        details: '',
        categories: [],
        subCategories: [],
        categoryId: '',
        subCategoryId: '',
        deliveryCountry: '',
        budget: '',
        validTillDate: '',
        loading: false,
        error: '',
        success: ''
    }

    user = this.props.user;
    token = this.props.token;

    componentDidMount() {
        this.getCategoryList(null);
    }

    getCategoryList = (parent = null) => {
        getCategories(this.token, parent).then(data => {
            if (!data) {
                this.setState({error: data.error})
            } else {
                parent !== null ? 
                this.setState({ subCategories: data.result}) :
                this.setState({ categories: data.result});
            }
        });
    };

    handleChange = name => event => {
        const { value } = event.target;
        this.setState({ [name]: value });
        if (name === 'categoryId') {
            this.getCategoryList(value)
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);

        const { user, token } = this.props;
        const { title, details, categoryId, subCategoryId, deliveryCountry, budget, validTillDate } = this.state;

        const data = {
            title,
            details,
            categoryId,
            subCategoryId,
            deliveryCountry,
            budget,
            validTillDate,
            userId: user._id
        }

        createOrder(data, token)
        .then(result => {
            if (result.error) {
                this.setState({ loading: false, error: result.error });
            } else {
                this.setState({
                    title: '',
                    details: '',
                    subCategories: [],
                    categoryId: '',
                    subCategoryId: '',
                    deliveryCountry: '',
                    budget: '',
                    validTillDate: '',
                    loading: false,
                    success: 'Order added successfully.'
                });
            }
        });
    };

    showLoader = () => ( this.state.loading && <Loader /> )
    showError = () => ( this.state.error && <ErrorMessage message={ this.state.error} /> );
    showSuccess = () => ( this.state.success && <SuccessMessage message={this.state.success} /> );

    addOrderHtml = () => {
        const {
            title,
            details,
            categories,
            subCategories,
            categoryId,
            subCategoryId,
            deliveryCountry,
            budget,
            validTillDate,
            loading,
            error,
            success,
        } = this.state;

        if (success) {
            return <Redirect to="/order" message={success} />;
        }

        return (
            <Fragment>
                <div className="col-sm-9">
                    <div className="card">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/product"><strong>Add New Orders</strong></Link>
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
                                        <label htmlFor="inputEmail4">Title</label>
                                        <input type="text" onChange={this.handleChange('title')} className="form-control" value={title} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="details">Details</label>
                                        <input type="text" onChange={this.handleChange('details')} value={details} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-row">
                                <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Category</label>
                                        <select onChange={this.handleChange('categoryId')} className="form-control">
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
                                        <label htmlFor="inputPassword4">Delivery Country</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('deliveryCountry')} value={deliveryCountry}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Sub Category</label>
                                        <select onChange={this.handleChange('subCategoryId')} className="form-control">
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
                                        <label htmlFor="inputPassword4">Budget</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('budget')} value={budget}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Valid Till Date</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('validTillDate')} value={validTillDate}/>
                                    </div>
                                </div>
                                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Add Order</button>
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
                {this.addOrderHtml()}
            </Layout>
        )
    }
}

export default AddOrder;