require('./item10.css');
import React from 'react';
import Num from './num';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			actionType: 1,//1:显示;2:编辑,
			coinType: 2,
			textareaValue: ''
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
		this.setState({
			textareaValue: this.props.item.fishNote
		});
	},
	updateNote(fishId) {
		let uid = util.getCookie('uid');
		let postData = {
			uid: uid,
			fishNote: this.state.textareaValue,
			fishId: fishId
		};
		//确认修改
		util.popShow('Change？',()=>{
			util.reqPost('/emaCat/currency/updateFishnote', postData, data => {
				//修改寄语
				console.log('Change wishes', data);
				if (data.resultCode === 300) {
					util.alert(data.resultMsg.replace('java.lang.Exception: ', ''));
				} else if (data.resultCode === 200) {
					//修改寄语成功
					util.alert('Success！',()=>{
						this.props.getUserFishList();
						this.props.popState();
					});
				}
			});
		});
	},
	handleTextareaChange(e) {
		console.log(e.target.value);
		this.setState({
			textareaValue: e.target.value
		})
	},
	changeType() {
		this.props.changeType(13);
	},


	render: function () {
		const {item} = this.props;
		const {textareaValue} = this.state;
		return (
			<div className={'item10'}>
				<div className={'msg'}>
					{/*//在这里写上寄语把*/}
					<textarea value={textareaValue} onChange={this.handleTextareaChange} placeholder={'Write your best wishes here.'}/>
				</div>

				{this.state.actionType === 1 && <div className={'action10'}>
					<div className={'l'} onClick={this.changeType.bind(this)}><i/></div>
					<div className={'r'} onClick={this.changeActionType.bind(this, 2)}><i/></div>
				</div>}

				{this.state.actionType === 2 && <div className={'fee'}>
					{/*<div className={'l'} onClick={this.changeCoinType.bind(this, 1)}>*/}
					{/*<i className={this.state.coinType === 1 ? 'radio on' : 'radio'}/>*/}
					{/*<i className={'coin1'}/>*/}
					{/*<i className={'underline'}/>*/}
					{/*</div>*/}
					<div className={'r only1'} onClick={this.changeCoinType.bind(this, 2)}>
						<i className={this.state.coinType === 2 ? 'radio on' : 'radio'}/>
						<i className={'coin2'}/>
						<i className={'underline'}/>
						<Num number={1}/>
					</div>
				</div>}

				{this.state.actionType === 2 && <div className={'pay'} onClick={this.updateNote.bind(this, item.fishId)}>
					<i className={`coin${this.state.coinType}`}/>
				</div>}

				<span className={'fish_num'}>#{item.fishId}</span>
			</div>
		);
	}
});
