require('./item2.css');
import React from 'react';
import Num from './num';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			listPosition: 0,
			maxPosition: 0,
			positionClass: ''
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	setDecorate(type, id) {
		this.props.setDecorate(type, id);
	},
	componentDidMount() {
		if (this.props.list.length > 0) {
			this.setState({
				maxPosition: Math.ceil(this.props.list.length / 2) - 2
			});
		}
		// this.getList();
	},
	changePosition(type) {
		if (type === 'next' && this.state.listPosition < this.state.maxPosition) {
			this.setState({
				positionClass: `position${this.state.listPosition}${this.state.listPosition + 1}`,
				listPosition: ++this.state.listPosition
			});
			setTimeout(() => {
				document.getElementById('domUl').style.left = -this.state.listPosition * 3.06 + 'rem';
			}, 2000);
		} else if (type === 'pre' && this.state.listPosition > 0) {
			this.setState({
				positionClass: `position${this.state.listPosition}${this.state.listPosition - 1}`,
				listPosition: --this.state.listPosition
			});
			setTimeout(() => {
				document.getElementById('domUl').style.left = -this.state.listPosition * 3.06 + 'rem';
			}, 2000);
		}
	},
	getList() {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid
		};
		util.reqPost('/emaCat/currency/getUserDecorateInfo', postData, data => {
			util.hideLoading();
			console.log(data);
		});
	},
	render() {
		const {list} = this.props;
		const {type} = this.props;
		return (
			<div id='item2'>
				{this.state.listPosition > 0 && <i className={'pre'} onClick={this.changePosition.bind(this, 'pre')}/>}
				<div className={'list'}>
					<ul id={'domUl'} className={this.state.positionClass}
							style={{width: `${Math.ceil(list.length / 2) * 3.06}rem`}}>
						{type === 'dec' && list.map((item, i) => <li
							onClick={this.props.setDecorate.bind(this, item.type, item.id)}>
							<img src={require(`../images/d${item.type}${item.id}l.png`)}/>
							<span className={'num'}>{item.name}</span>
						</li>)}
						{type === 'fish' && list.map((item, i) => <li
							onClick={this.props.changeCurItem.bind(this, 1, item.fishId)}>
							<img src={`${util.getImgHost()}/fish/${item.fishId}/small_icon_${item.fishId}.png`}/>
							<span className={'num'}>#{item.fishId}</span>
						</li>)}
						{type === 'market' && list.map((item, i) => <li
							onClick={this.props.setDecorate.bind(this, item.type, item.id)}>
							<img src={require(`../images/d${item.type}${item.id}l.png`)}/>
							<span className={'num'}>{item.name}</span>
							<div className={'price'}>
								<i className={'coin2'}/>
								<i className={'underline'}/>
								<Num number={888}/>
							</div>
						</li>)}
					</ul>
				</div>
				{this.state.listPosition < this.state.maxPosition &&
				<i className={'next'} onClick={this.changePosition.bind(this, 'next')}/>}
			</div>
		);
	}
});
