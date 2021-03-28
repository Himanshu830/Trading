import React, { Component } from 'react';
import Search from '../../search/Search';
import Layout from '../../layout/Layout';
import { listUsers } from './api';
import { SuccessMessage, ErrorMessage } from '../../message/messages';
import { Loader } from '../../loader/loader';
// import Modal from '../modal/Modal';

class Users extends Component {
    state = {
        users: [],
        // id: '',
        loading: false,
        error: '',
        success: ''
    }

    countryList = [
        {_id: 1, name: 'India'},
        {_id: 2, name: 'USA'},
        {_id: 3, name: 'Canada'},
        {_id: 4, name: 'UK'}
    ];

    getUsers = () => {
        listUsers(this.props.token).then(data => {
            if (data.error) {
                this.setState({ loading: false, error: data.error });
            } else {
                this.setState({  loading: false, users: data.result });
            }
        }).catch(error => {
            this.setState({ error: 'Something went wrong', loading: false})
        });
    }

    componentDidMount() {
        this.setState({loading: true})
        this.getUsers()
    }

    getCountryName = (id) => {
        let country = this.countryList.find(country => country._id === parseInt(id));
        return (country && country.name) ? country.name : '';
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(this.state.redirect !== prevState.redirect) {
    //         this.setState({loading: true})
    //         this.getOrders()
    //     }
    // }

    showLoader = () => ( this.state.loading && <Loader /> )
    showError = () => ( this.state.error && <ErrorMessage message={ this.state.error} /> );
    showSuccess = () => ( this.state.success && <SuccessMessage message={ this.state.success } /> );

    userListHtml = () => {
        console.log(this.state)
        return this.state.users.map((user, key) => {
            return (
                <tr key={user._id}>
                    <th scope="row">{key + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.company}</td>
                    <td>{this.getCountryName(user.country)}</td>
                    
                    {/* <td className="text-center">
                        <Link to={`/order/update/${order._id}`} type="button" className="btn btn-sm btn-outline-primary">Update</Link>
                    </td>
                    <td className="text-center">
                        <button onClick={() => this.setState({id: order._id, orderTitle: order.title}) } className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#exampleModalLong">Delete</button>
                    </td> */}
                </tr>
            )
        })
    }

    userHtml = () => {
        return (
            <div className="col-sm-9">
                <div className="card">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                {/* <li className="nav-item active">
                                    <Link className="btn btn-sm btn-outline-primary my-2 my-sm-0" to="/order/new">Add Order</Link>
                                </li> */}
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
                                    <th scope="col">Name</th>
                                    <th scope="col">email</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Country</th>
                                    {/* <th scope="col">Update</th>
                                    <th scope="col">Delete</th> */}
                                </tr>
                            </thead>
                            <tbody>{ this.userListHtml() }</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    onSearch = (term) => {
        this.setState({ loading: true });
        this.getUsers(term);
    }

    // onOrderDelete = () => {
    //     this.setState({loading: true});
    //     deleteOrder(this.state.id, this.props.token).then(result => {
    //         console.log(result)
    //         if(result.error) {
    //             console.log('setting error...')
    //             this.setState({ redirect: true, loading: false, error: result.error})
    //         } else {
    //             this.setState({ redirect: true, loading: false, success: 'Order deleted successfully.'})
    //         }
    //     }).catch(error => {
    //         this.setState({ id: '', orderTitle: '', loading: false, error });
    //     })
    // }

    render() {
        return (
            <Layout>
                { this.userHtml() }
                {/* <Modal 
                    title="Order Delete"
                    content= { (this.state.orderTitle) ? `Are you sure you want to delete order ${this.state.orderTitle}?` : 'Are you sure you want to delete this order?'}
                    onSubmit={() => this.onOrderDelete() }
                    onCancel={() => {}}
                /> */}
            </Layout>
        )
    }
}

export default Users;