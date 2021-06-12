import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../../search/Search';
import Layout from '../../layout/Layout';
import { getCategory, deleteCategory } from './api';
import { Loader } from '../../loader/loader';
import Modal from '../../modal/Modal';
import SuccessModal from '../../modal/SuccessModal';
import ErrorModal from '../../modal/ErrorModal';

class Category extends Component {
    state = {  
        categories: [],
        id: '',
        categoryName: '',
        loading: false,
        error: '',
        redirect: false,
        success: false,
        errorModal: false,
        successModal: false
    }

    getCategories = (term) => {
        getCategory(this.props.token, term).then(data => {
            if (data.error) {
                this.setState({ loading: false, errorModal: true, error: data.error });
            } else {
                this.setState({  loading: false, categories: data.result });
            }
        }).catch(error => {
            this.setState({ errorModal: true, error: 'Something went wrong', loading: false})
        });
    }

    componentDidMount() {
        this.setState({loading: true})
        this.getCategories()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.redirect !== prevState.redirect) {
            this.setState({loading: true})
            this.getCategories()
        }
    }

    showLoader = () => ( this.state.loading && <Loader /> )

    categoryListHtml = () => {
        return this.state.categories.map((category, key) => {
            let parentCategory = category.parent ? category.parent.name : '-';

            return (
                <tr key={category._id}>
                    <th scope="row">{key + 1}</th>
                    <td>{category.name}</td>
                    <td>{parentCategory}</td>
                    <td className="text-center">
                        <Link to={`/admin/category/update/${category._id}`} type="button" className="btn btn-sm btn-outline-primary">Update</Link>
                    </td>
                    <td className="text-center">
                        <button onClick={() => this.setState({id: category._id}) } className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#exampleModalLong">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    categoriesHtml = () => {
        return (
            <div className="col-sm-9">
                <div className="card">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <Link className="btn btn-sm btn-outline-primary my-2 my-sm-0" to="/admin/category/new">Add Category</Link>
                                </li>
                            </ul>
                            <Search onSearch={this.onSearch} />
                        </div>
                    </nav>

                    <div className="card-body table-sm">
                        { this.showLoader() }
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Parent Category</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>{ this.categoryListHtml() }</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    onSearch = (term) => {
        this.setState({ loading: true });
        this.getCategories(term);
    }

    onOrderDelete = () => {
        this.setState({loading: true});
        deleteCategory(this.state.id, this.props.token).then(result => {
            console.log(result)
            if(result.error) {
                console.log('setting error...')
                this.setState({ redirect: true, loading: false, error: result.error})
            } else {
                this.setState({ redirect: true, loading: false, success: 'Category deleted successfully.'})
            }
        }).catch(error => {
            this.setState({ id: '', loading: false, errorModal: true, error });
        })
    }

    onClose = () => {
        this.setState({errorModal: false, error: ''});
    }

    render() {
        return (
            <Layout>
                { this.categoriesHtml() }
                <Modal 
                    title="Category Delete"
                    content= { (this.state.categoryName) ? `Are you sure you want to delete order ${this.state.categoryName}?` : 'Are you sure you want to delete this category?'}
                    onSubmit={() => this.onOrderDelete() }
                    onCancel={() => {}}
                />
                { this.state.successModal && 
                    <SuccessModal
                        title="Success"
                        content= { this.state.success }
                        redirectUrl= {`/admin/category`}
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

export default Category;