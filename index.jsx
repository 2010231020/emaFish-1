require('./app/lib/common.css');
require('./app/lib/common');
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, Redirect,browserHistory} from 'react-router';
import Login from './app/components/login';
import Sale from './app/components/sale.jsx';
import Social from './app/components/social';
import Brothel from './app/components/brothel.jsx';
import Family from './app/components/family';
import Personal from './app/components/personal';
import Market from './app/components/market';
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
			<Route path="/social" component={Social}/>
		</Router>
	,
	document.getElementById("myApp")
);
