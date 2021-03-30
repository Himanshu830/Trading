import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { getCategoryById, getParentCategory, updateCategory } from './api';
import { SuccessMessage, ErrorMessage } from '../../message/messages';
import { Loader } from '../../loader/loader';

class UpdateCategory extends Component {
    state = {
        name: '',
        parent: '',
        categories: [],
        loading: false,
        error: '',
        success: ''
    }

    user = this.props.user;
    token = this.props.token;
    categoryId = this.props.match.params.categoryId;

    componentDidMount() {
        this.getCategoryList();
        getCategoryById(this.categoryId, this.token).then(category => {
            console.log(category)
            this.setState({
                name: category.name,
                parent: category.parent
            });
        }).catch(error => {
            console.log(error)
            this.setState({ error: 'Category not found.'})
        })
    }

    getCategoryList = () => {
        getParentCategory(this.token).then(data => {
            if (!data) {
                this.setState({error: data.error})
            } else {
                this.setState({ categories: data.result})
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
        const { name, parent} = this.state;

        const data = {
            name,
            parent: parent ? parent : null,
            userId: this.user._id
        }

        updateCategory(this.categoryId, data, this.token)
        .then(result => {
            if (result.error) {
                this.setState({ loading: false, error: result.error });
            } else {
                this.setState({
                    name: '',
                    parent: '',
                    loading: false,
                    success: 'Category udpated successfully.'
                });
            }
        });
    };

    showLoader = () => ( this.state.loading && <Loader /> )
    showError = () => ( this.state.error && <ErrorMessage message={ this.state.error} /> );
    showSuccess = () => ( this.state.success && <SuccessMessage message={this.state.success} /> );

    updateCategoryHtml = () => {
        const {
            name,
            parent,
            categories,
            loading,
            error,
            success,
        } = this.state;

        if (success) {
            return <Redirect to="/admin/category" message={success} />;
        }

        return (
            <Fragment>
                <div className="col-sm-9">
                    <div className="card">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/product"><strong>Update Category</strong></Link>
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
                                        <input type="text" onChange={this.handleChange('name')} className="form-control" value={name} />
                                    </div>
                                </div>
                                <div className="form-row">
                                <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Parent</label>
                                        <select onChange={this.handleChange('parent')} className="form-control" value={parent}>
                                            <option value="">Select Category</option>
                                            {categories &&
                                                categories.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Update Category</button>
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
                {this.updateCategoryHtml()}
            </Layout>
        )
    }
}

export default UpdateCategory;