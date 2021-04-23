import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { getParentCategory, createCategory } from './api';
import { Loader } from '../../loader/loader';
import SuccessModal from '../../modal/SuccessModal';
import ErrorModal from '../../modal/ErrorModal';

class AddCategory extends Component {
    state = {
        name: '',
        parent: '',
        categories: [],
        loading: false,
        error: '',
        success: '',
        errorModal: false,
        successModal: false
    }

    user = this.props.user;
    token = this.props.token;

    componentDidMount() {
        this.getCategoryList(null);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.success !== this.state.success) {
            this.getCategoryList();
        }
    }

    getCategoryList = () => {
        getParentCategory(this.token).then(data => {
            if (!data) {
                this.setState({errorModal: true, error: data.error})
            } else {
                this.setState({ categories: data.result});
            }
        });
    };

    handleChange = name => event => {
        const { value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);

        const { user, token } = this.props;
        const { name, parent } = this.state;

        const data = {
            name,
            parent,
            userId: user._id
        }

        createCategory(data, token)
        .then(result => {
            if (result.error) {
                this.setState({ loading: false, errorModal: true, error: result.error });
            } else {
                this.setState({
                    name: '',
                    parent: '',
                    userId: '',
                    status: '',
                    loading: false,
                    success: 'Category added successfully.',
                    successModal: true
                });
            }
        });
    };

    showLoader = () => ( this.state.loading && <Loader /> )

    AddCategoryHtml = () => {
        const {
            name,
            parent,
            categories
        } = this.state;

        return (
            <Fragment>
                <div className="col-sm-9">
                    <div className="card">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/product"><strong>Add New Category</strong></Link>
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
                                        <label htmlFor="inputEmail4">Name</label>
                                        <input type="text" onChange={this.handleChange('name')} className="form-control" value={name} />
                                    </div>
                                </div>
                                <div className="form-row">
                                <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Parent Category</label>
                                        <select onChange={this.handleChange('parent')} className="form-control" values={parent}>
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
                                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Add</button>
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
                {this.AddCategoryHtml()}

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

export default AddCategory;