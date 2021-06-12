import React, { Component, Fragment } from 'react';
import Layout from '../layout/Layout';
import { Link, Redirect } from 'react-router-dom'
import { getOrderById, deleteOrder } from './api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';
// import { arrayBufferToBase64 } from '../../utility/image';
// import { SITE_URL } from '../../config';
import Menu from '../layout/partial/Menu';
import { isAuthenticated } from '../auth/api';

import Modal from '../modal/Modal';

class ViewOrder extends Component {
    state = {
        title: '',  
        type: '',
        categoryName: '',
        subCategoryName: '',
        details: '',
        deliveryCountry: '',
        budget: '',
        orderValidTill: '',
        loading: false,
        error: '',
        success: '',
        redirect: false
    }

    orderId = this.props.match.params.orderId;

    componentDidMount() {
        this.setState({ loading: true });
        getOrderById(this.orderId, this.props.token).then(order => {
            console.log(order)
            let data = order.result;

            let categoryName = (data.categoryId) ? data.categoryId._id : '';
            let subCategoryName = (data.subCategoryId) ? data.subCategoryId._id : '';
            this.setState({
                title: data.title,
                type: data.type,
                categoryName: categoryName,
                subCategoryName: subCategoryName,
                details: data.details,
                deliveryCountry: data.deliveryCountry,
                budget: data.budget,
                orderValidTill: data.validTillDate,
                loading: false
            });
        }).catch(error => {
            console.log(error)
            this.setState({ loading: false, error: 'Order not found.' })
        })
    }

    showLoader = () => (this.state.loading && <Loader />)
    showError = () => (this.state.error && <ErrorMessage message={this.state.error} />);
    showSuccess = () => (this.state.success && <SuccessMessage message={this.state.success} />);

    viewOrderHtml = () => {
        const {
            title,
            type,
            categoryName,
            subCategoryName,
            details,
            deliveryCountry,
            budget,
            orderValidTill,
            redirect,
        } = this.state;

        const { user } = isAuthenticated();

        if (redirect) {
            return <Redirect to="/order" />;
        }

        if (user) {
            return (
                <Layout>
                    <div className="col-sm-9">
                        <div className="card">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                        <li className="nav-item active">
                                            <span className="nav-link" to="/order"><strong>Order Detail</strong></span>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Title</b>:</div>
                                        <div className="col-sm-6">{title}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Order Type</b>:</div>
                                        <div className="col-sm-6">{type}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Category</b>:</div>
                                        <div className="col-sm-6">{categoryName}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Subcategory</b>:</div>
                                        <div className="col-sm-6">{subCategoryName}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Details</b>:</div>
                                        <div className="col-sm-6">{details}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Deliver Country</b>:</div>
                                        <div className="col-sm-6">{deliveryCountry}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Budget</b>:</div>
                                        <div className="col-sm-6">{budget}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Order Valid Till</b>:</div>
                                        <div className="col-sm-6">{orderValidTill}</div>
                                    </div>
                                </li>

                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <Link to={`/order/update/${this.orderId}`} type="button" className="btn btn-sm btn-outline-primary">Update</Link>
                                        </div>
                                        <div className="col-sm-2">
                                            <button onClick={() => this.setState({ id: this.orderId, title: this.state.title })} className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#exampleModalLong">Delete</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            <Modal
                                title="Order Delete"
                                content={(this.state.title) ? `Are you sure you want to delete order ${this.state.title}?` : 'Are you sure you want to delete this order?'}
                                onSubmit={() => this.onOrderDelete()}
                                onCancel={() => { }}
                            />

                            {/* <Link to={`/order/update/${order._id}`} type="button" className="btn btn-sm btn-outline-primary">Update</Link>

                            <button onClick={() => this.setState({ id: order._id, productName: order.name })} className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#exampleModalLong">Delete</button> */}
                        </div>
                    </div>
                </Layout>
            );
        } else {
            return (
                <Fragment>
                    <Menu />
                    <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8">
                            <div className="card">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                            <li className="nav-item active">
                                                <span className="nav-link" to="/order"><strong>Order Detail</strong></span>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>


                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Title</b>:</div>
                                            <div className="col-sm-6">{title}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Order Type</b>:</div>
                                            <div className="col-sm-6">{type}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Category</b>:</div>
                                            <div className="col-sm-6">{categoryName}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Subcategory</b>:</div>
                                            <div className="col-sm-6">{subCategoryName}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Details</b>:</div>
                                            <div className="col-sm-6">{details}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Deliver Country</b>:</div>
                                            <div className="col-sm-6">{deliveryCountry}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Budget</b>:</div>
                                            <div className="col-sm-6">{budget}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Order Valid Till</b>:</div>
                                            <div className="col-sm-6">{orderValidTill}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                    
                </Fragment>
            );
        }
    }

   
   

    onOrderDelete = () => {
        this.setState({ loading: true });
        deleteOrder(this.state.id, this.props.token).then(result => {
            if (result.error) {
                this.setState({ redirect: true, loading: false, error: result.error })
            } else {
                this.setState({ redirect: true, loading: false, success: 'Order deleted successfully.' })
            }
        }).catch(error => {
            this.setState({ id: '', productName: '', loading: false, error });
        })
    }

    render() {
        return this.viewOrderHtml();
    }
}

export default ViewOrder;