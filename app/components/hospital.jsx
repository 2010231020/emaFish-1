require('./hospital.css');
import React from 'react';
import Back from './back';
import Res from './res';
import util from '../util/util';
import Cattr from './cattr';

module.exports = React.createClass({
	getInitialState: function () {
		return {
			list: [],
			f: false,
			fid: 0,
			mid: 0,
			m: false,
			s: false,
			showFlag: false,
			sonInfo: {}
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
				alert('请等待!');
				util.reqPost('/emaCat/breed/withSelfCat', postData, data => {
					util.delCookie('fid');
					util.delCookie('mid');
					util.delCookie('from');
					console.log(data);
					if (data.resultCode === 200) {
						this.setState({
							s: true,
							sonInfo: data.child,
							showFlag: true
						});
						alert('繁殖成功!');
						// const path = '/family';
						// this.context.router.push(path);
					} else {
						alert(data.resultMsg);
					}

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
					if (data.resultCode === 200) {
						alert('繁殖成功!');
						const path = '/family';
						this.context.router.push(path);
					} else {
						alert(data.resultMsg);
					}
				})
			}
		}

	},
	changeShowFlag() {
		this.setState({
			showFlag: !this.state.showFlag
		});
	},
	componentDidMount() {
		console.log(util.getCookie('fid'), util.getCookie('mid'));
		if (util.getCookie('fid') && util.getCookie('fid') != '' && util.getCookie('fid') != "''") {
			this.setState({
				f: true,
				fid: util.getCookie('fid')
			});
		}
		if (util.getCookie('mid') && util.getCookie('mid') != '' && util.getCookie('mid') != "''") {
			this.setState({
				m: true,
				mid: util.getCookie('mid')
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
					<img onClick={this.to.bind(this, '/family', 'f')} className='f'
							 src={`${util.getImgHost()}/fish/${this.state.fid}/small_icon_${this.state.fid}.png`}/>}
					{!this.state.f &&
					<img onClick={this.to.bind(this, '/family', 'f')} className='f' src={require('../images/catty-s.png')}/>}

					<img onClick={this.papa.bind(this, 0)} className='x' src={require('../images/xin.png')}/>
					{this.state.m &&
					<img onClick={this.to.bind(this, '/family', 'm')} className='m'
							 src={`${util.getImgHost()}/fish/${this.state.mid}/small_icon_${this.state.mid}.png`}/>}
					{!this.state.m &&
					<img onClick={this.to.bind(this, '/family', 'm')} className='m' src={require('../images/catty-s.png')}/>}
					{/*<div className='m'>*/}
					{/*{this.state.m &&*/}
					{/*<img onClick={this.to.bind(this, '/family', 'm')}  src={require('../images/catty-f.png')}/>}*/}
					{/*</div>*/}
					<div className='icon-d'>
						<img src={require('../images/icon-d.png')}/>
					</div>
					{!this.state.s &&
					<div className='s'>
						<img src={require('../images/catty-s.png')}/></div>}
					{this.state.s &&
					<div className='s' onClick={this.changeShowFlag}>
						<img
							src={`${util.getImgHost()}/fish/${this.state.sonInfo.catId}/small_icon_${this.state.sonInfo.catId}.png`}/>
					</div>}

				</div>
				{this.state.showFlag &&
				<Cattr from={'hos'} handleShow={this.changeShowFlag.bind(this)} item={this.state.sonInfo}/>}
			</div>
		);
	}
});
