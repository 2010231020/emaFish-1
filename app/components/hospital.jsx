require('./hospital.css');
import React from 'react';
import Back from './back';
import Res from './res';
import util from '../util/util';
import Cattr from './cattr';
import Shelve from './shelve';
import Popup from './popup';


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
			curItem: {},
			listShow: false,
			currentChoice: 'f',
			curAttr: 'hos',//hos:表示有确定按钮;normal:正常界面
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	to(currentChoice) {
		this.setState({
			curAttr: 'hos',
			currentChoice: currentChoice,
			listShow: true
		});
	},
	closePop(catId) {
		if (this.state.currentChoice === 'f') {
			this.setState({
				f: true,
				s: false,
				fid: catId,
				listShow: false
			});
		} else {
			this.setState({
				m: true,
				s: false,
				mid: catId,
				listShow: false
			});
		}
	},
	getList() {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid
		};
		util.reqPost('/emaCat/currency/getUserCatList', postData, data => {
			console.log(data);
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

	papa(type) {
		let mainCatId = this.state.fid;
		let secondCatId = this.state.mid;
		if (mainCatId === secondCatId) {
			util.popShow('不要和自己交配');
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
					util.hideLoading();
					if (data.resultCode === 200) {
						this.setState({
							curAttr: 'normal',
							s: true,
							sonInfo: data.child,
							showFlag: true,
							curItem: data.child
						});
						util.popShow('繁殖成功');
						// const path = '/family';
						// this.context.router.push(path);
					} else {
						util.popShow();
						this.setState({
							popStr: data.resultMsg
						});
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
					util.hideLoading();
					if (data.resultCode === 200) {
						alert('繁殖成功!');
						const path = '/family';
						this.context.router.push(path);
					} else {
						util.popShow(data.resultMsg.replace('java.lang.Exception: ', ''));
					}
				})
			}
		}
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
	changeListShow() {
		this.setState({
			listShow: !this.state.listShow
		});
	},
	componentDidMount() {
		this.getList();
	},
	render: function () {
		return (
			<div id='hospital'>
				<Back/>
				<Popup str={this.state.popStr}/>
				<Res from={'1'}/>
				<div className='list-content'>
					<div className={'parents'}>
						{this.state.f &&
						<img onClick={this.to.bind(this, 'f')} className='f'
								 src={`${util.getImgHost()}/fish/${this.state.fid}/small_icon_${this.state.fid}.png`}/>}
						{!this.state.f &&
						<img onClick={this.to.bind(this, 'f')} className='f' src={require('../images/fish-null.png')}/>}

						<img onClick={this.papa.bind(this, 0)} className='x' src={require('../images/xin.png')}/>
						{this.state.m &&
						<img onClick={this.to.bind(this, 'm')} className='m'
								 src={`${util.getImgHost()}/fish/${this.state.mid}/small_icon_${this.state.mid}.png`}/>}
						{!this.state.m &&
						<img onClick={this.to.bind(this, 'm')} className='m' src={require('../images/fish-null.png')}/>}
					</div>
					{/*<div className='m'>*/}
					{/*{this.state.m &&*/}
					{/*<img onClick={this.to.bind(this, '/family', 'm')}  src={require('../images/catty-f.png')}/>}*/}
					{/*</div>*/}
					<div className='icon-d'>
						<img src={require('../images/icon-d.png')}/>
					</div>
					{!this.state.s &&
					<div className='s' onClick={this.papa.bind(this, 0)}>
						<img src={require('../images/catty-s.png')}/></div>}
					{this.state.s &&
					<div className='s' onClick={this.changeShowFlag.bind(this, 0)}>
						<img
							src={`${util.getImgHost()}/fish/${this.state.sonInfo.catId}/small_icon_${this.state.sonInfo.catId}.png`}/>
					</div>}

				</div>
				{this.state.showFlag &&
				<Cattr from={this.state.curAttr} handlePop={this.closePop} handleShow={this.changeShowFlag.bind(this)}
							 item={this.state.curItem}/>}

				{this.state.listShow && <div className={'pop'}>
					<ul>
						{this.state.list.map(item => <li onClick={this.changeShowFlag.bind(this, 1, item)}><Shelve
							item={item}
							from='hos'
						/>
						</li>)}
					</ul>
					<i onClick={this.changeListShow} className={'back'}>
						<img src={require('../images/back.png')}/>
					</i>
				</div>}


			</div>
		);
	}
});
