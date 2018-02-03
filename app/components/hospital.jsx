require('./hospital.css');
import React from 'react';
import Back from './back';
import Res from './res';
import util from '../util/util';

module.exports = React.createClass({
	getInitialState: function () {
		return {
			list: [],
			f: false,
			m: false,
			s: false
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	show: function () {
		// event.preventDefault();
	},
	to(path, fr) {
		util.setCookie('from', fr);
		this.context.router.push(path);
	},
	papa(type) {
		let mainCatId = util.getCookie('fid');
		let secondCatId = util.getCookie('mid');
		if (mainCatId === secondCatId) {
			alert('不要和自己交配');
		} else {
			let postData = {
				uid: util.getCookie('uid'),
				secondCatId: secondCatId,
				mainCatId: mainCatId
			};
			if (type === 0) {
				util.reqPost('/emaCat/breed/withSelfCat', postData, data => {
					util.delCookie('fid');
					util.delCookie('mid');
					util.delCookie('from');
					console.log(data);
					this.setState({
						s: true
					});
					alert('繁殖成功!');
					setTimeout(() => {
						const path = '/family';
						this.context.router.push(path);
					}, 3000)
				})
			} else if (type === 1) {
				postData = {
					uid: util.getCookie('uid'),
					orderId: orderId,
					mainCatId: util.getCookie('mainCat')
				};
				util.reqPost('/emaCat/breed/withLeaseCat', postData, data => {
					console.log(data);
					util.delCookie('mainCat');
					util.delCookie('from');
					alert('繁殖成功!');
					const path = '/family';
					this.context.router.push(path);
				})
			}
		}

	},
	componentDidMount() {
		console.log(util.getCookie('fid').length, util.getCookie('mid'));
		if (util.getCookie('fid') && util.getCookie('fid') != '' && util.getCookie('fid') != "''") {
			this.setState({
				f: true
			});
		}
		if (util.getCookie('mid') && util.getCookie('mid') != '' && util.getCookie('mid') != "''") {
			this.setState({
				m: true
			});
		}
	},
	render: function () {
		return (
			<div id='hospital'>
				<Back/>
				<Res from={'1'}/>
				<div className='list-content'>
					{this.state.f &&
					<img onClick={this.to.bind(this, '/family', 'f')} className='f' src={require('../images/catty-m.png')}/>}
					{!this.state.f &&
					<img onClick={this.to.bind(this, '/family', 'f')} className='f' src={require('../images/catty-s.png')}/>}

					<img className='x' src={require('../images/xin.png')}/>
					{this.state.m &&
					<img onClick={this.to.bind(this, '/family', 'm')} className='m' src={require('../images/catty-f.png')}/>}
					{!this.state.m &&
					<img onClick={this.to.bind(this, '/family', 'm')} className='m' src={require('../images/catty-s.png')}/>}
					{/*<div className='m'>*/}
					{/*{this.state.m &&*/}
					{/*<img onClick={this.to.bind(this, '/family', 'm')}  src={require('../images/catty-f.png')}/>}*/}
					{/*</div>*/}
					<div className='icon-d'>
						<img src={require('../images/icon-d.png')}/>
					</div>
					<div className='s'>
						{this.state.s &&
						<img src={require('../images/catty-m.png')}/>}
						{!this.state.s &&
						<img src={require('../images/catty-s.png')}/>}
					</div>
					<div className='start' onClick={this.papa.bind(this, 0)}>
						<img src={require('../images/start.png')}/>
					</div>
				</div>
			</div>
		);
	}
});
