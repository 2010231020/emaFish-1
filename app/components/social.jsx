require('./social.css');
import React from 'react';
import Back from './back';
import Res from './res';
import Show from './show';
import Cattr from './cattr';
import Shelve from './shelve';
import {Link} from 'react-router';
import Popup from './popup';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			list: [],
			handleChange: false,
			listShow: false,
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	buy() {
		let postData = {
			uid: util.getCookie('uid')
		};
		util.reqPost('/emaCat/transcation/luckFish', postData, data => {
			console.log(data);
			util.hideLoading();
			this.setState({
				handleChange: !this.state.handleChange
			});
			if (data.resultCode === 200) {

				this.getList();
				util.popShow('捕捉成功');
				// const path = '/family';
				// this.context.router.push(path);
			} else {
				if(data.resultMsg==="java.lang.Exception: luckNum is 0"){
					util.popShow('没有捕捉机会啦');
				}else{
					util.popShow(data.resultMsg.replace('java.lang.Exception: ',''));
				}
			}
			// setTimeout(() => {
			// 	const path = '/family';
			// 	this.context.router.push(path);
			// }, 3000);
		})
	},
	getList() {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid
		};
		util.reqPost('/emaCat/currency/getUserCatList', postData, data => {
			console.log(data);
			util.hideLoading();
			this.setState({
				list: data.catList
			});
			if (data.catList && data.catList.length > 0) {
				// this.setState({
				// 	listShow: true
				// });
			} else {

			}
		});
	},
	changeShowFlag(type, item) {
		if (type === 1) {
			this.setState({
				showFlag: !this.state.showFlag,
				curItem: item
			});
		} else {
			this.setState({
				showFlag: !this.state.showFlag,
				curItem: this.state.sonInfo
			});
		}
	},
	changeListShow(type) {
		if (type === 1) {
			this.getList();
			this.setState({
				listShow: !this.state.listShow
			});
		} else {
			this.setState({
				listShow: !this.state.listShow
			});
		}
	},
	componentDidMount() {
		this.getList();
	},
	closePop(catId) {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid,
			catId: catId
		};
		util.reqPost('/emaCat/transcation/releaseFish', postData, data => {

			util.popShow('放生成功');
			util.hideLoading();
			this.setState({
				handleChange: !this.state.handleChange
			});
			this.getList();
		});
	},
	render: function () {
		return (
			<div id='social'>
				<Popup/>
				<Back to='/home'/>
				<Res handleChange={this.state.handleChange}/>
				<Show uid={1}/>
				<footer>
					<div className={'tab'} onClick={this.buy}>
						<img src={require('../images/hunt.png')}/>
					</div>
					<div onClick={this.changeListShow.bind(this)} className={'tab'}>
						<img src={require('../images/free-bg.png')}/>
					</div>
				</footer>
				{this.state.showFlag &&
				<Cattr from={'social'} handlePop={this.closePop} handleShow={this.changeShowFlag.bind(this)}
							 item={this.state.curItem}/>}
				{this.state.listShow && <div className={'pop'}>
					{this.state.list.length > 0 && <ul>
						{this.state.list.map(item => <li onClick={this.changeShowFlag.bind(this, 1, item)}><Shelve
							item={item}
							from='hos'
						/>
						</li>)}
					</ul>}

					{this.state.list.length === 0 && <div className={'no-fish'}>
						<p>大兄弟，你没鱼了！</p>
						<p className={'to-market'}><Link to='/market'>去市场买几只</Link></p>
					</div>}
					<i onClick={this.changeListShow} className={'back'}>
						<img src={require('../images/back.png')}/>
					</i>
				</div>}
			</div>
		);
	}
});
