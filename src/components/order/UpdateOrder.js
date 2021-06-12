import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import { getCategories, getOrderById, updateOrder, deleteOrder } from './api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';
import { CountryList, ORDER_TYPE } from '../constant';
import Modal from '../modal/Modal';
import SuccessModal from '../modal/SuccessModal';
import ErrorModal from '../modal/ErrorModal';

class UpdateOrder extends Component {
    state = {
        title: '',
        type: '',
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
        success: '',
        errorModal: false,
        successModal: false
    }

    user = this.props.user;
    token = this.props.token;
    orderId = this.props.match.params.orderId;

    componentDidMount() {
        this.getCategoryList(null);
        getOrderById(this.orderId, this.token).then(order => {
            let data = order.result;
            this.setState({
                title: data.title,
                type: data.type,
                details: data.details,
                categoryId: data.categoryId._id,
                subCategoryId: data.subCategoryId._id,
                deliveryCountry: data.deliveryCountry,
                budget: data.budget,
                validTillDate: data.validTillDate
            });

            this.getCategoryList(data.categoryId._id)
        }).catch(error => {
            console.log(error)
            this.setState({ error: 'Order not found.'})
        })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(this.state.redirect !== prevState.redirect) {
    //         this.setState({loading: true})
    //     }
    // }

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

        const { title, type, details, categoryId, subCategoryId, deliveryCountry, budget, validTillDate } = this.state;
        const data = {
            title,
            type,
            details,
            categoryId,
            subCategoryId,
            deliveryCountry,
            budget,
            validTillDate,
            userId: this.user._id
        }

        updateOrder(this.orderId, data, this.token)
        .then(result => {
            if (result.error) {
                this.setState({ loading: false, errorModal: true, error: result.error });
            } else {
                this.setState({
                    title: '',
                    type: '',
                    details: '',
                    subCategories: [],
                    categoryId: '',
                    subCategoryId: '',
                    deliveryCountry: '',
                    budget: '',
                    validTillDate: '',
                    loading: false,
                    success: 'Order added successfully.',
                    successModal: true
                });
            }
        });
    };

    showLoader = () => ( this.state.loading && <Loader /> )

    updateOrderHtml = () => {
        const {
            title,
            type,
            details,
            categories,
            subCategories,
            categoryId,
            subCategoryId,
            deliveryCountry,
            budget,
            validTillDate,
            // loading,
            // error,
            // success,
            // redirect,
        } = this.state;

        return (
            <Fragment>
                <div className="col-sm-9">
                    <div className="card">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/product"><strong>Update Orders</strong></Link>
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
                                        <label htmlFor="inputEmail4">Title</label>
                                        <input type="text" onChange={this.handleChange('title')} className="form-control" value={title} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Order Type</label>
                                        <select onChange={this.handleChange('type')} className="form-control" value={type}>
                                            <option value="">Select Type</option>
                                            {ORDER_TYPE &&
                                                Object.values(ORDER_TYPE).map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                        </select>
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
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="details">Details</label>
                                        <input type="text" onChange={this.handleChange('details')} value={details} className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Delivery Country</label>
                                        {/* <input type="text" className="form-control" onChange={this.handleChange('deliveryCountry')} value={deliveryCountry}/> */}
                                        <select defaultValue={deliveryCountry} onChange={this.handleChange('deliveryCountry')} className="form-control">
                                            <option value="">Select Country</option>
                                            {Object.values(CountryList).map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Budget</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('budget')} value={budget}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Order Valid Till</label>
                                        <input type="text" className="form-control" onChange={this.handleChange('validTillDate')} value={validTillDate}/>
                                    </div>
                                </div>
                                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Update Order</button>
                                {/* &nbsp;&nbsp;&nbsp;
                                <button onClick={ (e) => this.onDelete(e, this.orderId,this.state.title) } className="btn btn-danger" data-toggle="modal" data-target="#exampleModalLong">Delete</button>             */}
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    onDelete = (event, orderId, title) => {
        event.preventDefault()
        this.setState({id: orderId, orderTitle: title})
    }

    onOrderDelete = () => {
        this.setState({loading: true});
        deleteOrder(this.state.id, this.props.token).then(result => {
            console.log(result)
            if(result.error) {
                console.log('setting error...')
                this.setState({ redirect: true, loading: false, error: result.error})
            } else {
                this.setState({ redirect: true, loading: false, success: 'Order deleted successfully.'})
            }
        }).catch(error => {
            this.setState({ id: '', orderTitle: '', loading: false, error });
        })
    }

    onClose = () => {
        this.setState({errorModal: false, error: ''});
    }

    render() {
        return (
            <Layout>
                {this.updateOrderHtml()}
                <Modal
                    title="Order Delete"
                    content={(this.state.orderTitle) ? `Are you sure you want to delete order ${this.state.orderTitle}?` : 'Are you sure you want to delete this order?'}
                    onSubmit={() => this.onOrderDelete()}
                    onCancel={() => { }}
                />

                { this.state.successModal && 
                    <SuccessModal
                        title="Success"
                        content= { this.state.success }
                        redirectUrl= {`/order`}
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

export default UpdateOrder;