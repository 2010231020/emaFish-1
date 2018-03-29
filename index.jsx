require('./app/lib/common.css');
require('./app/lib/common');
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, Redirect,browserHistory} from 'react-router';
import Login from './app/components/login';
import Home from './app/components/home';

ReactDOM.render(
		<Router history={browserHistory}>
			<Redirect from="/" to="/login"/>
			<Route path="/login" component={Login}/>
			<Route path="/home" component={Home}/>
		</Router>
	,
	document.getElementById("myApp")
);
