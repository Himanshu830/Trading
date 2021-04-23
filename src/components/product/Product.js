import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/Search';
import Layout from '../layout/Layout';
import { getProductsByUser, deleteProduct } from './api';
import { Loader } from '../loader/loader';
import Modal from '../modal/Modal';
import { arrayBufferToBase64 } from '../../utility/image';

class Product extends Component {
    state = {
        id: '',
        product: [],
        productName: '',
        loading: false,
        error: '',
        redirect: false,
        success: ''
    }

    getProducts = (searchTerm) => {
        getProductsByUser(this.props.token, searchTerm).then(data => {
            if (data.error) {
                this.setState({ loading: false, error: data.error });
            } else {
                this.setState({ loading: false, product: data.result });
            }
        }).catch(error => {
            this.setState({ error: 'Something went wrong', loading: false })
        });
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.getProducts()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.redirect !== prevState.redirect) {
            this.setState({ loading: true })
            this.getProducts()
        }
    }

    onSearch = (term) => {
        this.setState({ loading: true });
        this.getProducts(term);
    }

    onProductDelete = () => {
        this.setState({ loading: true });
        deleteProduct(this.state.id, this.props.token).then(result => {
            if (result.error) {
                this.setState({ redirect: true, loading: false, error: result.error })
            } else {
                this.setState({ redirect: true, loading: false, success: 'Product deleted successfully.' })
            }
        }).catch(error => {
            this.setState({ id: '', productName: '', loading: false, error });
        })
    }

    showLoader = () => (this.state.loading && <Loader />)

    productListHtml = () => {
        let { product } = this.state;
        if (!product) {
            return '';
        }
        return product.map((product, key) => {
            let categoryName = (product.categoryId) ? product.categoryId.name : '';
            let subCategoryName = (product.subCategoryId) ? product.subCategoryId.name : '';
            return (
                <tr key={product._id}>
                    <th scope="row">{key + 1}</th>
                    <td>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </td>
                    <td>
                        <img
                            height="35px"
                            src={`data:${product.image.contentType};base64,${arrayBufferToBase64(product.image.data.data)}`}
                            alt='product'
                        />
                    </td>
                    <td>{categoryName}</td>
                    <td>{subCategoryName}</td>
                    <td>{product.minQuantity}</td>
                    <td>{product.unitPrice}</td>
                    {/* <td className="text-center">
                        <Link to={`/product/${product._id}`} type="button" className="btn btn-sm btn-outline-primary">View</Link>
                    </td> */}
                    {/* <td className="text-center">
                        <Link to={`/product/update/${product._id}`} type="button" className="btn btn-sm btn-outline-primary">Update</Link>
                    </td>
                    <td className="text-center">
                        <button onClick={() => this.setState({ id: product._id, productName: product.name })} className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#exampleModalLong">Delete</button>
                    </td> */}
                </tr>
            )
        })
    }

    productHtml = () => {
        return (
            <div className="col-sm-9">
                <div className="card">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <Link className="btn btn-sm btn-outline-primary my-2 my-sm-0" to="/product/new">Add Product</Link>
                                </li>
                            </ul>
                            <Search onSearch={this.onSearch} />
                        </div>
                    </nav>

                    <div className="card-body table-sm">
                        {this.showLoader()}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Sub-category</th>
                                    <th scope="col">Min Qty.</th>
                                    <th scope="col">Unit Price</th>
                                    {/* <th scope="col" colSpan="3" style={{ textAlign: "center" }}>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>{this.productListHtml()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Layout>
                { this.productHtml()}
                <Modal
                    title="Product Delete"
                    content={(this.state.productName) ? `Are you sure you want to delete product ${this.state.productName}?` : 'Are you sure you want to delete this product?'}
                    onSubmit={() => this.onProductDelete()}
                    onCancel={() => { }}
                />
            </Layout>
        )
    }
}

export default Product;