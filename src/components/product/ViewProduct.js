import React, { Component, Fragment } from 'react';
import Layout from '../layout/Layout';
import { getProductById } from './api';
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
        success: ''
    }

    productId = this.props.match.params.productId;

    componentDidMount() {
        this.setState({ loading: true });
        getProductById(this.productId).then(product => {
            let data = product.result;
            this.setState({
                name: data.name,
                description: data.description,
                unitPrice: data.unitPrice,
                categoryName: data.categoryId.name,
                subCategoryName: data.subCategoryId.name,
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
            image,
        } = this.state;

        const { user } = isAuthenticated();

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
                            </ul>
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
            </Fragment>
        )
    }

    render() {
        return this.viewProductHtml();
    }
}

export default ViewProduct;