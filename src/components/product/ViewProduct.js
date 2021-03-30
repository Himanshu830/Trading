import React, { Component, Fragment } from 'react';
import Layout from '../layout/Layout';
import { getProductById } from './api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';
import { arrayBufferToBase64 } from '../../utility/image';
import { FacebookShareButton, FacebookIcon} from "react-share";
import { SITE_URL } from '../../config';
import Menu from '../layout/partial/Menu';
import { isAuthenticated } from '../auth/api';

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
        this.setState({loading: true});
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
            this.setState({loading: false, error: 'Product not found.'})
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

        if(user) {
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
                                <li className="list-group-item"><b>Name</b>: {name}</li>
                                <li className="list-group-item"><b>Category</b>: {categoryName}</li>
                                <li className="list-group-item"><b>Subcategory</b>: {subCategoryName}</li>
                                <li className="list-group-item"><b>Description</b>: {description}</li>
                                <li className="list-group-item"><b>Unit Price</b>: {unitPrice}</li>
                                <li className="list-group-item"><b>Min Quantity</b>: {minQuantity}</li>
                                <li className="list-group-item"><b>Packaging Details</b>: {packagingDetail}</li>
                                <li className="list-group-item"><b>Delivery Time</b>: {deliveryTime}</li>
                                <li className="list-group-item"><b>Image</b>:
                                {image && (
                                    <img
                                        height="75px"
                                        src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`}
                                        alt='product'
                                    />
                                )}
                                </li>
                                <li className="list-group-item"><b>Share</b>:
                                    <FacebookShareButton 
                                        url={`${SITE_URL}/product/${this.productId}`}
                                    >
                                        <FacebookIcon size={36} />
                                    </FacebookShareButton>    
                                </li>
                            </ul>
                        </div>
                    </div>
                </Layout>
            );
        } else {
            return (
                <Fragment>
                    <div className="row" style={{marginTop: "20px"}}>
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
                                <li className="list-group-item"><b>Name</b>: {name}</li>
                                <li className="list-group-item"><b>Category</b>: {categoryName}</li>
                                <li className="list-group-item"><b>Subcategory</b>: {subCategoryName}</li>
                                <li className="list-group-item"><b>Description</b>: {description}</li>
                                <li className="list-group-item"><b>Unit Price</b>: {unitPrice}</li>
                                <li className="list-group-item"><b>Min Quantity</b>: {minQuantity}</li>
                                <li className="list-group-item"><b>Packaging Details</b>: {packagingDetail}</li>
                                <li className="list-group-item"><b>Delivery Time</b>: {deliveryTime}</li>
                                <li className="list-group-item"><b>Image</b>:
                                {image && (
                                    <img
                                        height="75px"
                                        src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`}
                                        alt='product'
                                    />
                                )}
                                </li>
                                <li className="list-group-item"><b>Share</b>:
                                    <FacebookShareButton 
                                        url={`${SITE_URL}/product/${this.productId}`}
                                    >
                                        <FacebookIcon size={36} />
                                    </FacebookShareButton>    
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

    render() {
        return this.viewProductHtml();
    }
}

export default ViewProduct;