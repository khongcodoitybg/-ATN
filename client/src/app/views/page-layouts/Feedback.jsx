import React, { Component } from 'react';
import { Grid, Button, Icon } from '@material-ui/core';
import history from 'history.js';
import ConstantList from '../../appConfig';

import { withTranslation } from 'react-i18next';

class Feedback extends Component {
	constructor(props) {
		super(props);
	}
	state = {};
	render() {
		let { t, i18n } = this.props;
		return (
			<div
				style={{
					display: 'flex',
					marginTop: '30px',
					justifyContent: 'center',
					position: 'relative',
				}}>
				<iframe
					src="https://docs.google.com/forms/d/e/1FAIpQLSedVjwnuazyrtGuKUKoIKZGp17qjYTsEY4uTtLzes6m1AtB1g/viewform?embedded=true"
					width="80%"
					height="800"
					frameborder="0"
					marginheight="0"
					marginwidth="0">
					Đang tải…
				</iframe>
				<p
					onClick={() => {
						history.push(ConstantList.ROOT_PATH);
					}}
					style={{
						position: 'absolute',
						right: '20px',
						top: '0px',
						textDecoration: 'underline',
						cursor: 'pointer',
						color: '#1976d2',
					}}>
					{t('back to home')}
				</p>
			</div>
		);
	}
}

export default withTranslation()(Feedback);
