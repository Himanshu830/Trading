import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routes/privateRoute';
import AdminRoute from './components/routes/adminRoute';

import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import AccountActivation from './components/auth/AccountActivation';
import Home from './components/Home';
import About from './components/pages/About';
import Dashboard from './components/user/Dashboard';
import Profile from './components/user/Profile';
import Company from './components/company/company';
import Contact from './components/contact/Contact';

import Category from './components/admin/category/Category';
import AddCategory from './components/admin/category/AddCategory';
import UpdateCategory from './components/admin/category/UpdateCategory';

import Product from './components/product/Product';
import AddProduct from './components/product/AddProduct';
import ViewProduct from './components/product/ViewProduct';
import UpdateProduct from './components/product/UpdateProduct';

import Order from './components/order/Order';
import AddOrder from './components/order/AddOrder';
import ViewOrder from './components/order/ViewOrder'
import UpdateOrder from './components/order/UpdateOrder';

import AdminDashboard from './components/admin/AdminDashboard';
import Users from './components/admin/user/Users';
import Chat from './components/chat/Chat';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/activate/:token' exact component={AccountActivation} />
                <Route path='/forgot-password' exact component={ForgotPassword} />
                <Route path='/auth/reset/:token' exact component={ResetPassword} />

                <Route path='/about' exact component={About} />
                <Route path='/contact' exact component={Contact} />

                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/profile" exact component={Profile} />
                <PrivateRoute path="/company" exact component={Company} />


                <PrivateRoute path="/product" exact component={Product} />
                <PrivateRoute path="/product/new" exact component={AddProduct} />
                <PrivateRoute path="/product/:productId" exact component={ViewProduct} />
                <PrivateRoute path="/product/update/:productId" exact component={UpdateProduct} />

                <PrivateRoute path="/order" exact component={Order} />
                <PrivateRoute path="/order/new" exact component={AddOrder} />
                <PrivateRoute path="/order/:orderId" exact component={ViewOrder} />
                <PrivateRoute path="/order/update/:orderId" exact component={UpdateOrder} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/admin/users" exact component={Users} />

                <AdminRoute path="/admin/category" exact component={Category} />
                <AdminRoute path="/admin/category/new" exact component={AddCategory} />
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                
                <PrivateRoute path="/chat" exact component={Chat} />
                <PrivateRoute path="/chat/:userId" exact component={Chat} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;