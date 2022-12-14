import React, { Component } from 'react';
import { Grid, Icon } from '@material-ui/core';
import history from 'history.js';
import { withTranslation } from 'react-i18next';
import ConstantList from '../../appConfig';
import './Footer.scss';

class Footer1 extends Component {
	state = {};
	render() {
		let { t } = this.props;
		return (
			<div
				className="section-footer1 bg-light-dark"
				id="footer1">
				<div className="container">
					<Grid container>
						<Grid
							item
							lg={4}
							md={4}
							sm={12}>
							<div className="footer1__about">
								<p style={{ fontSize: '1.25rem' }}>About Us</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Officiis perferendis rem, aut aliquam neque nam? dolor sit
									amet, consectetur adipisicing elit consectetur adipisicing
									elit. Officiis perferendis rem, aut aliquam.
								</p>
								<button
									className="button-71"
									onClick={() => {
										history.push(
											ConstantList.ROOT_PATH + 'page-layouts/feedback'
										);
									}}>
									{t('feedback')}
								</button>
							</div>
						</Grid>
						<Grid
							item
							lg={4}
							md={4}
							sm={12}>
							<div className="footer1__contact">
								<p style={{ fontSize: '1.25rem' }}>Contact</p>
								<div className="px-16 my-32">
									<Icon className="footer1__contact__icon">mail</Icon>
									<div className="pl-16">
										<p className="m-0 p-0">Email</p>
										<p className="m-0 p-0">quangnvtybg@gmail.com</p>
									</div>
								</div>
								<div className="px-16 mt-32">
									<Icon className="footer1__contact__icon">location_on</Icon>
									<div className="pl-16">
										<p className="m-0 p-0">Adress</p>
										<p className="m-0 p-0">Ho Tung Mau street, Hanoi</p>
									</div>
								</div>
							</div>
						</Grid>
						<Grid
							item
							lg={4}
							md={4}
							sm={12}>
							<div className="footer1__disclaimer">
								<p style={{ fontSize: '1.25rem' }}>Disclaimer</p>
								<p>
									© 2022 Quang Nguyen.
									<br />
									All Rights Reserved.
								</p>

								<div className="mt-32 footer1__disclaimer__link">
									<a
										href="https://www.instagram.com/"
										className="px-8">
										<img
											src="./assets/images/social-linkedin.png"
											alt=""
										/>
									</a>
									<a
										href="https://twitter.com/?lang=en"
										className="px-8">
										<img
											src="./assets/images/social-twitter.png"
											alt=""
										/>
									</a>
									<a
										href="https://www.facebook.com/"
										className="px-8">
										<img
											src="./assets/images/social-facebook.png"
											alt=""
										/>
									</a>
								</div>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withTranslation()(Footer1);
