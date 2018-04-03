require('./item2.css');
import React from 'react';
import Num from './num';
import DecorateBox from './decorateBox';

let util = require('../util/util');
let User = require('../util/User');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			listPosition: 0,
			maxPosition: 0,
			positionClass: '',
			curPropId: null
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	setDecorate(item, isPre) {
		this.props.setDecorate(item.propId, isPre);
		if (isPre) {//商城
			if (this.state.curPropId === item.propId) {
				this.buy(item.id, item.propId);
			} else {
				this.setState({
					curPropId: item.propId
				});
			}
		}
	},
	componentDidMount() {
		if (this.props.list.length > 0) {
			if (this.props.type === 'dec') {
				this.setState({
					maxPosition: Math.ceil((this.props.list.length - 1) / 2) - 2
				});
			} else {
				this.setState({
					maxPosition: Math.ceil(this.props.list.length / 2) - 2
				});
			}
		}
		// this.getList();
	},
	changePosition(type) {
		if (type === 'next' && this.state.listPosition < this.state.maxPosition) {
			document.getElementById('domUl').style.left = (1 + this.state.listPosition) * (-3.06) + 'rem';
			this.setState({
				positionClass: `position${this.state.listPosition}${this.state.listPosition + 1}`,
				listPosition: ++this.state.listPosition
			});
			// setTimeout(() => {
			// 	if (document.getElementById('domUl')) {
			// 		document.getElementById('domUl').style.left = -this.state.listPosition * 3.06 + 'rem';
			// 	}
			// }, 2000);
		} else if (type === 'pre' && this.state.listPosition > 0) {
			document.getElementById('domUl').style.left = (this.state.listPosition - 1) * (-3.06) + 'rem';
			this.setState({
				positionClass: `position${this.state.listPosition}${this.state.listPosition - 1}`,
				listPosition: --this.state.listPosition
			});

			// setTimeout(() => {
			// 	if (document.getElementById('domUl')) {
			// 		document.getElementById('domUl').style.left = -this.state.listPosition * 3.06 + 'rem';
			// 	}
			// }, 2000);
		}
	},
	buy(commondyId, propId) {
		//阻止事件冒泡
		// e.stopPropagation();
		// e.nativeEvent.stopImmediatePropagation();
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid,
			propId: propId,
			pondId: util.getCookie('pondId'),
			commondyId: commondyId
		};
		util.popShow(`确认购买${User.getInstance().getProp(propId).propName}？`, () => {
			util.reqPost('/emaCat/transcation/buyCommodity', postData, data => {
				console.log(data);
				if (propId != 2) {
					this.props.setDecorate(propId, false);
				}
				util.alert(data.resultMsg.replace('java.lang.Exception: ', ''));
			});
		});
	},
	render() {
		const {list} = this.props;
		const {type} = this.props;
		return (
			<div id='item2'>
				{this.state.listPosition > 0 && <i className={'pre'} onClick={this.changePosition.bind(this, 'pre')}/>}
				<div className={'list'}>
					{type === 'dec' &&
					<ul id={'domUl'} style={{width: `${Math.ceil((list.length - 1) / 2) * 3.06}rem`}}>
						{list.map((item, i) => item.propId !== 1 && <li
							onClick={this.setDecorate.bind(this, item, false)}>
							<DecorateBox propId={item.propId}/>
						</li>)}
					</ul>}
					{type === 'fish' &&
					<ul id={'domUl'} style={{width: `${Math.ceil((list.length) / 2) * 3.06}rem`}}>
						{list.map((item, i) => <li
							onClick={this.props.changeCurItem.bind(this, 1, item.fishId)}>
							<img src={util.getImg(item.gene)}/>
							<span className={'name'}>#{item.fishId}</span>
							{item.fishStatus === '1' && <span className={'status'}>上架中</span>}
							{item.fishStatus === '10002' && <span className={'status'}>出游中</span>}
						</li>)}
					</ul>
					}
					{type === 'market' &&
					<ul id={'domUl'} style={{width: `${Math.ceil((list.length) / 2) * 3.06}rem`}}>
						{list.map((item, i) => <li
							onClick={this.setDecorate.bind(this, item, true)}>
							<DecorateBox propId={item.propId}/>
							<div className={'price'}>
								<i className={'coin2'}/>
								<i className={'underline'}/>
								<Num number={item.price}/>
							</div>
						</li>)}
					</ul>
					}
				</div>
				{this.state.listPosition < this.state.maxPosition &&
				<i className={'next'} onClick={this.changePosition.bind(this, 'next')}/>}
			</div>
		);
	}
});
