require('./item7.css');
import React from 'react';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			coinType: 1
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
	render: function () {
		return (
			<div className={'item7'}>
				<div className={'info'}>
					<div className={'l'}><i/></div>
					<div className={'r'}>
						<textarea placeholder={'在这里写上寄语吧'}></textarea>
					</div>
				</div>
				<div className={'fee'}>
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
				</div>
				<div className={'pay'}>
					<i className={`coin${this.state.coinType}`}/>
				</div>
			</div>
		);
	}
});
