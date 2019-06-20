import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom';
import Dash from './Dash'
import Login from './Login'
import Signup from './drafts_trash/Signup';
import UserPage from './UserPage'
import PostBill from './drafts_trash/PostBill'
import PostPayment from './drafts_trash/PostPayment'
import ConnectStripe from './ConnectStripe'
import CardPayment from './CardPayment'
import LandingPage from './LandingPage';
import CreateCustomerObject from './CreateCustomerObject';
import CardDemo from './Test';
import AddCard from './AddCard';

function Routes () {
    return (
        <div>
            <BrowserRouter>
                <Route exact path = '/' component = {LandingPage}/>
                <Route path = '/username' component = {Dash}/>
                <Route path = '/user' component = {UserPage}/>
                <Route path = '/login' component = {Login}/>
                <Route path = '/signup' component = {Signup}/>
                <Route path = '/connectstripe' component = {ConnectStripe}/>
                <Route path = '/cardpayment' component = {CardPayment}/>
                <Route path = '/bills' component = {PostBill}/>
                <Route path = '/payments' component = {PostPayment}/>
                <Route path = '/customer' component = {CreateCustomerObject}/>
                <Route path = '/test' component = {CardDemo}/>
                <Route path = '/addpaymentmethod' component = {AddCard}/>
            </BrowserRouter>
        </div>
    )
}

export default Routes;