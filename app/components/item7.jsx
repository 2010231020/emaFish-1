require('./item7.css');
import React from 'react';
import Num from './num';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			coinType: 2,
			textareaValue: ''
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	changeCoinType(type) {
		this.setState({
			coinType: type
		});
	},
	componentDidMount() {
	},
	handleTextareaChange(e) {
		console.log(e.target.value);
		this.setState({
			textareaValue: e.target.value
		})
	},
	hatch() {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid,
			word: this.state.textareaValue
		};
		//确认孵化
		util.popShow('incubation？', () => {
			util.reqPost('/emaCat/currency/hatchFish', postData, data => {
				console.log(data);
				if (data.resultCode === 300) {
					util.alert(data.resultMsg.replace('java.lang.Exception: ', ''));
				} else if (data.resultCode === 200) {
					this.props.getUserFishList();
					this.props.getUserInfoList();
					//孵化中
					util.alert("In the incubation！", () => {
						this.props.popState();
					});
				}
			});
		});
	},
	render: function () {
		const {textareaValue} = this.state;
		return (
			<div className={'item7'}>
				<div className={'info'}>
					<div className={'l'}><i/></div>
					<div className={'r'}>
						{/*//在这里写上寄语把*/}
						<textarea value={textareaValue} onChange={this.handleTextareaChange} placeholder={'Write your best wishes here.'}/>
					</div>
				</div>
				<div className={'fee'}>
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
				</div>
				<div className={'pay'} onClick={this.hatch.bind(this)}>
					<i className={`coin${this.state.coinType}`}/>
				</div>
			</div>
		);
	}
});
