import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/Search';
import Layout from '../layout/Layout';
import { getOrdersByUser, deleteOrder } from './api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';
import Modal from '../modal/Modal';

class Order extends Component {
    state = {
        order: [],
        id: '',
        orderTitle: '',
        loading: false,
        error: '',
        redirect: false,
        success: ''
    }

    getOrders = (searchTerm) => {
        getOrdersByUser(this.props.token, searchTerm).then(data => {
            if (data.error) {
                this.setState({ loading: false, error: data.error });
            } else {
                this.setState({  loading: false, order: data.result });
            }
        }).catch(error => {
            this.setState({ error: 'Something went wrong', loading: false})
        });
    }

    componentDidMount() {
        this.setState({loading: true})
        this.getOrders()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.redirect !== prevState.redirect) {
            this.setState({loading: true})
            this.getOrders()
        }
    }

    showLoader = () => ( this.state.loading && <Loader /> )
    showError = () => ( this.state.error && <ErrorMessage message={ this.state.error} /> );
    showSuccess = () => ( this.state.success && <SuccessMessage message={ this.state.success } /> );

    orderListHtml = () => {
        return this.state.order.map((order, key) => {
            return (
                <tr key={order._id}>
                    <th scope="row">{key + 1}</th>
                    <td>{order.title}</td>
                    <td>{order.budget}</td>
                    <td>{order.categoryId.name}</td>
                    <td>{order.subCategoryId.name}</td>
                    <td className="text-center">
                        <Link to={`/order/update/${order._id}`} type="button" className="btn btn-sm btn-outline-primary">Update</Link>
                    </td>
                    <td className="text-center">
                        <button onClick={() => this.setState({id: order._id, orderTitle: order.title}) } className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#exampleModalLong">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    orderHtml = () => {
        return (
            <div className="col-sm-9">
                <div className="card">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <Link className="btn btn-sm btn-outline-primary my-2 my-sm-0" to="/order/new">Add Order</Link>
                                </li>
                            </ul>
                            <Search onSearch={this.onSearch} />
                        </div>
                    </nav>

                    <div className="card-body table-sm">
                        { this.showLoader() }
                        { this.showError() }
                        { this.showSuccess() }
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Budget</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Sub-category</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>{ this.orderListHtml() }</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    onSearch = (term) => {
        this.setState({ loading: true });
        this.getOrders(term);
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

    render() {
        return (
            <Layout>
                { this.orderHtml() }
                <Modal 
                    title="Order Delete"
                    content= { (this.state.orderTitle) ? `Are you sure you want to delete order ${this.state.orderTitle}?` : 'Are you sure you want to delete this order?'}
                    onSubmit={() => this.onOrderDelete() }
                    onCancel={() => {}}
                />
            </Layout>
        )
    }
}

export default Order;