require('./list.css');
import React from 'react';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			list: []
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	componentDidMount() {
		// this.setState({
		// 	isOn: util.getCookie('catIndex') || false
		// });
		// this.getList();
	},
	render() {
		const {fishList} = this.props;
		if (fishList.length > 0) {
			// document.getElementById('domUl').style.width = catList.length * 2.7 + 'rem';
		}
		return (
			<div id='list'>
				<i className={'pre'}/>
				<ul className={'item1'}>
					{fishList.map((item, i) => <li onClick={this.props.changeCurItem.bind(this, 1, item.fishId)}>
						<img src={`${util.getImgHost()}/fish/${item.fishId}/small_icon_${item.fishId}.png`}/>
						<span className={'num'}>#{item.fishId}</span>
					</li>)}
				</ul>
				<i className={'next'}/>
			</div>
		);
	}
});
