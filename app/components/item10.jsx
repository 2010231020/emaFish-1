require('./item10.css');
import React from 'react';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			actionType: 1,//1:显示;2:编辑,
			coinType: 1
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	changeActionType(type) {
		this.setState({
			actionType: type
		});
	},
	changeCoinType(type) {
		this.setState({
			coinType: type
		});

		// var a = '3156793';
		// var tmpArr = a.split("");
		// var tmp1 = tmpArr;
		// var tmp2 = [];
		// tmp1.pop();
		// for (var i = tmp.length - 1; i > 1; i--) {
		// 	tmp1.pop();
		// 	var num1 = tmp[i];//倒1
		// 	var num2 = tmp[i-1];//倒2
		// 	if (num1 > num2) {
		// 		console.log(tmp1.concat(tmp2));
		// 		break;
		// 	} else {
		// 		//进行一次有序数组的插入
		// 		insert(tmp2,tmp[i]);
		// 	}
		// }
	},
	componentDidMount() {
	},
	changeType() {
		this.props.changeType(13);
	},


	render: function () {
		const {item} = this.props;
		return (
			<div className={'item10'}>
				<div className={'msg'}>
					<textarea placeholder={'在这里写上寄语吧'}></textarea>
				</div>
				{this.state.actionType === 1 && <div className={'action10'}>
					<div className={'l'} onClick={this.changeType.bind(this)}><i/></div>
					<div className={'r'} onClick={this.changeActionType.bind(this, 2)}><i/></div>
				</div>}

				{this.state.actionType === 2 && <div className={'fee'}>
					<div className={'l'} onClick={this.changeCoinType.bind(this, 1)}>
						<i className={this.state.coinType === 1 ? 'radio on' : 'radio'}/>
						<i className={'coin1'}/>
						<i className={'underline'}/>
					</div>
					<div className={'r'} onClick={this.changeCoinType.bind(this, 2)}>
						<i className={this.state.coinType === 2 ? 'radio on' : 'radio'}/>
						<i className={'coin2'}/>
						<i className={'underline'}/>
					</div>
				</div>}

				{this.state.actionType === 2 && <div className={'pay'}>
					<i className={`coin${this.state.coinType}`}/>
				</div>}


				<span className={'fish_num'}>#{item.fishId}</span>
			</div>
		);
	}
});
