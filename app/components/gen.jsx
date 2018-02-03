require('./gen.css');
import React from 'react';

module.exports = React.createClass({
	getInitialState() {
		return {
			tabFlag: 1
		}
	},
	changeTab(flag) {
		this.setState({tabFlag: flag});
	},
	render() {
		const tabFlag = this.state.tabFlag;
		return (
			<div className='gen'>
				{tabFlag === 1 ? <ul className='ul1'>
					<li>
						<span className='span1'>猫咪品种</span>
						<span className='span2'>1%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1'>猫咪品种</span>
						<span className='span2'>1%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1'>猫咪品种</span>
						<span className='span2'>1%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1'>猫咪品种</span>
						<span className='span2'>1%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1'>猫咪品种</span>
						<span className='span2'>1%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1'>猫咪品种</span>
						<span className='span2'>1%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1'>猫咪品种</span>
						<span className='span2'>1%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
				</ul> : <ul className='ul2'>
					<li>
						<div className='t'>父母</div>
						<div className='avatar'>
							<img src={require('../images/avatar1.png')}/>
							<img src={require('../images/avatar1.png')}/>
						</div>
					</li>
					<li>
						<div className='t'>子女</div>
						<div className='avatar'>
							<img src={require('../images/avatar1.png')}/>
							<img src={require('../images/avatar1.png')}/>
							<img src={require('../images/avatar1.png')}/>
							<img src={require('../images/avatar1.png')}/>
						</div>
					</li>
					<li>
						<div className='t'>配偶</div>
						<div className='avatar'>
							<img src={require('../images/avatar1.png')}/>
							<img src={require('../images/avatar1.png')}/>
							<img src={require('../images/avatar1.png')}/>
						</div>
					</li>
				</ul>}

				<div className={tabFlag === 1 ? 'tab attr1 on' : 'tab attr1'} onClick={this.changeTab.bind(this, 1)}>
				</div>
				<div className={tabFlag === 2 ? 'tab attr2 on' : 'tab attr2'} onClick={this.changeTab.bind(this, 2)}>
				</div>
			</div>
		)
	}
});
