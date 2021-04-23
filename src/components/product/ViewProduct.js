import React, { Component, Fragment } from 'react';
import Layout from '../layout/Layout';
import { Link, Redirect } from 'react-router-dom'
import { getProductById, deleteProduct } from './api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';
import { arrayBufferToBase64 } from '../../utility/image';
import { SITE_URL } from '../../config';
import Menu from '../layout/partial/Menu';
import { isAuthenticated } from '../auth/api';
import { 
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    } from "react-share";
import Modal from '../modal/Modal';

class ViewProduct extends Component {
    state = {
        name: '',
        description: '',
        unitPrice: '',
        categoryName: '',
        subCategoryName: '',
        minQuantity: '',
        packagingDetail: '',
        deliveryTime: '',
        image: '',
        loading: false,
        error: '',
        success: '',
        redirect: false
    }

    productId = this.props.match.params.productId;

    componentDidMount() {
        this.setState({ loading: true });
        getProductById(this.productId).then(product => {
            let data = product.result;

            let categoryName = (data.categoryId) ? data.categoryId._id : '';
            let subCategoryName = (data.subCategoryId) ? data.subCategoryId._id : '';
            this.setState({
                name: data.name,
                description: data.description,
                unitPrice: data.unitPrice,
                categoryName: categoryName,
                subCategoryName: subCategoryName,
                minQuantity: data.minQuantity,
                packagingDetail: data.packagingDetail,
                deliveryTime: data.deliveryTime,
                image: data.image,
                loading: false
            });
        }).catch(error => {
            console.log(error)
            this.setState({ loading: false, error: 'Product not found.' })
        })
    }

    showLoader = () => (this.state.loading && <Loader />)
    showError = () => (this.state.error && <ErrorMessage message={this.state.error} />);
    showSuccess = () => (this.state.success && <SuccessMessage message={this.state.success} />);

    viewProductHtml = () => {
        const {
            name,
            description,
            unitPrice,
            categoryName,
            subCategoryName,
            minQuantity,
            packagingDetail,
            deliveryTime,
            redirect,
            image,
        } = this.state;

        const { user } = isAuthenticated();

        if(redirect) {
            return <Redirect to="/product" />;
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
                                            <span className="nav-link" to="/product"><strong>Product Detail</strong></span>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Name</b>:</div>
                                        <div className="col-sm-6">{name}</div>
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
                                        <div className="col-sm-2"><b>Description</b>:</div>
                                        <div className="col-sm-6">{description}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Unit Price</b>:</div>
                                        <div className="col-sm-6">{unitPrice}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Min Quantity</b>:</div>
                                        <div className="col-sm-6">{minQuantity}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Packaging Detail</b>:</div>
                                        <div className="col-sm-6">{packagingDetail}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Delivery Time</b>:</div>
                                        <div className="col-sm-6">{deliveryTime}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Image</b>:</div>
                                        <div className="col-sm-6">
                                        {image && (
                                            <img
                                                height="75px"
                                                src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`}
                                                alt='product'
                                            />
                                        )}
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-2"><b>Share</b>:</div>
                                        { this.socialShareButton() }
                                    </div>
                                </li>

                                <li className="list-group-item">
                                    <div className="row">
                                         <div className="col-sm-2">
                                             <Link to={`/product/update/${this.productId}`} type="button" className="btn btn-sm btn-outline-primary">Update</Link>
                                         </div>
                                         <div className="col-sm-2">
                                         <button onClick={() => this.setState({ id: this.productId, productName: this.state.name })} className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#exampleModalLong">Delete</button>
                                         </div>
                                    </div>
                                </li>
                            </ul>
                            

                           
                            {/* <Link to={`/product/update/${product._id}`} type="button" className="btn btn-sm btn-outline-primary">Update</Link>

                            <button onClick={() => this.setState({ id: product._id, productName: product.name })} className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target="#exampleModalLong">Delete</button> */}
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
                                                <span className="nav-link" to="/product"><strong>Product Detail</strong></span>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Name</b>:</div>
                                            <div className="col-sm-6">{name}</div>
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
                                            <div className="col-sm-2"><b>Description</b>:</div>
                                            <div className="col-sm-6">{description}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Unit Price</b>:</div>
                                            <div className="col-sm-6">{unitPrice}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Min Quantity</b>:</div>
                                            <div className="col-sm-6">{minQuantity}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Packaging Detail</b>:</div>
                                            <div className="col-sm-6">{packagingDetail}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Delivery Time</b>:</div>
                                            <div className="col-sm-6">{deliveryTime}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Image</b>:</div>
                                            <div className="col-sm-6">
                                            {image && (
                                                <img
                                                    height="75px"
                                                    src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`}
                                                    alt='product'
                                                />
                                            )}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-sm-2"><b>Share</b>:</div>
                                            { this.socialShareButton() }
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

    
    socialShareButton = () => {
        return (
            <Fragment>
                <div className="col-sm-1">
                    <FacebookShareButton
                        url={`${SITE_URL}/product/${this.productId}`}
                    >
                        <FacebookIcon size={36} />
                    </FacebookShareButton>
                </div>

                <div className="col-sm-1">
                    <LinkedinShareButton
                        url={`${SITE_URL}/product/${this.productId}`}
                    >
                        <LinkedinIcon size={36} />
                    </LinkedinShareButton>
                </div>

                <div className="col-sm-1">
                    <TwitterShareButton
                        url={`${SITE_URL}/product/${this.productId}`}
                    >
                        <TwitterIcon size={36} />
                    </TwitterShareButton>
                </div>

                <Modal
                    title="Product Delete"
                    content={(this.state.productName) ? `Are you sure you want to delete product ${this.state.productName}?` : 'Are you sure you want to delete this product?'}
                    onSubmit={() => this.onProductDelete()}
                    onCancel={() => { }}
                />
            </Fragment>
        )
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

    render() {
        return this.viewProductHtml();
    }
}

export default ViewProduct;