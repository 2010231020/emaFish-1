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
		const {item} = this.props;
		const gene = item.gene.split(',');
		return (
			<div className='gen'>
				{tabFlag === 1 ? <ul className='ul1'>
					<li>
						<span className='span1 t1'>背鳍</span>
						<span className='span2'>{gene[0]}%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1 t2'>胡须</span>
						<span className='span2'>{gene[1]}%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1 t3'>身体</span>
						<span className='span2'>{gene[2]}%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1 t4'>鱼鳍</span>
						<span className='span2'>{gene[3]}%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1 t5'>颜色</span>
						<span className='span2'>{gene[4]}%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
					<li>
						<span className='span1 t6'>眼睛</span>
						<span className='span2'>{gene[5]}%</span>
						<span className='span3'><img src={require('../images/up.png')}/></span>
					</li>
				</ul> : <ul className='ul2'>
					<li>
						<div className='t'><span className={'f'}>父母</span></div>
						<div className='avatar'>
							<img src={require('../images/fish-l1.png')}/>
							<img src={require('../images/fish-l2.png')}/>
						</div>
					</li>
					<li>
						<div className='t'><span className={'m'}>子女</span></div>
						<div className='avatar'>
							<img src={require('../images/fish-l1.png')}/>
							<img src={require('../images/fish-l2.png')}/>
							<img src={require('../images/fish-l3.png')}/>
						</div>
					</li>
				</ul>
				}


				<div className={tabFlag === 1 ? 'tab attr1 on' : 'tab attr1'} onClick={this.changeTab.bind(this, 1)}>
				</div>
				<div className={tabFlag === 2 ? 'tab attr2 on' : 'tab attr2'} onClick={this.changeTab.bind(this, 2)}>
				</div>
			</div>
		)
	}
});
