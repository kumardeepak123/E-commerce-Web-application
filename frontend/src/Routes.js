import React from "react" 
import {BrowserRouter ,Switch ,Route} from 'react-router-dom'
import Home from "./core/Home"
import SignIn from "./user/Signin"
import Signup from "./user/Signup"
import    AdminRoute    from  './auth/helper/AdminRoutes'
import    PrivateRoute    from  './auth/helper/PrivateRoutes'
import   UserdashBoard  from './user/UserDashBoard'
import    Admindashboard  from './user/AdminDashBoard'
import AdminDashboard from "./user/AdminDashBoard"
import  AddCategory from './admin/AddCategory'
import ManageCategories from "./admin/ManageCategories"
import AddProduct from "./admin/AddProduct"

import UpdateProduct from "./admin/UpdateProduct"
import UpdateCategory from "./admin/UpdateCategory"
import ManageProducts from "./admin/ManageProducts"

import Cart from "./core/cart"



const Routes=()=>{
     return(
        <BrowserRouter>
         <Switch>
              <Route  path="/"  exact  component={Home}/>
              <Route  path="/signin" exact component={SignIn}/>
              <Route  path="/signup" exact component={Signup}/>
              <Route  path="/cart" exact component={Cart}/>
              <PrivateRoute path="/user/dashboard" exact component={UserdashBoard}/>
              <AdminRoute  path="/admin/dashboard" exact component={Admindashboard}/>
              <AdminRoute  path="/admin/create/category" exact component={AddCategory}/>
              <AdminRoute  path="/admin/categories" exact component={ManageCategories}/>
              <AdminRoute  path="/admin/create/product" exact component={AddProduct}/>
              <AdminRoute  path="/admin/products" exact component={ManageProducts}/>
              <AdminRoute  path="/admin/product/update/:productId" exact component={UpdateProduct}/>
             
              <AdminRoute  path="/admin/category/update/:categoryId" exact component={UpdateCategory}/>
         </Switch>
        </BrowserRouter>
     );
}


export default Routes ;