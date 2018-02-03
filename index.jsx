require('./app/lib/common.css');
require('./app/lib/common');
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, Redirect,browserHistory} from 'react-router';
import Login from './app/components/login';
import Sale from './app/components/sale.jsx';
import Mai from './app/components/mai';
import Brothel from './app/components/brothel.jsx';
import Family from './app/components/family';
import Personal from './app/components/personal';
import Market from './app/components/market';
import Hospital from './app/components/hospital';
import Home from './app/components/home';

ReactDOM.render(
		<Router history={browserHistory}>
			<Redirect from="/" to="/login"/>
			<Route path="/login" component={Login}/>
			<Route path="/home" component={Home}/>
			<Route path="/family" component={Family}/>
			<Route path="/personal" component={Personal}/>
			<Route path="/brothel" component={Brothel}/>
			<Route path="/market" component={Market}/>
			<Route path="/sale" component={Sale}/>
			<Route path="/mai" component={Mai}/>
			<Route path="/birth" component={Hospital}/>
		</Router>
	,
	document.getElementById("myApp")
);
