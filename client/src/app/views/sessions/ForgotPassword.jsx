import React, { Component } from 'react';
import ConstantList from '../../appConfig';
import { Card, Grid, Button } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { withRouter } from 'react-router-dom';

import { resetPassword } from '../../redux/actions/LoginActions';
import { forgotPassword } from './SignUpService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
	autoClose: 2000,
	draggable: false,
	limit: 3,
});

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		email: '',
	};
	handleChange = (event) => {
		event.persist();
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	handleFormSubmit = () => {
		forgotPassword(this.state.email)
			.then((res) => {
				toast.success(res.data.message);
				this.props.history.push(ConstantList.ROOT_PATH + 'session/signin');
			})
			.catch((e) => {
				toast.error(e.message);
			});
	};
	render() {
		const { t, i18n } = this.props;
		let { email } = this.state;

		return (
			<div className="signup flex flex-center w-100 h-100vh">
				<div className="p-8">
					<Card className="signup-card position-relative y-center">
						<Grid container>
							<Grid
								item
								lg={5}
								md={5}
								sm={5}
								xs={12}>
								<div className="p-32 flex flex-center flex-middle h-100">
									<img
										src="/assets/images/illustrations/dreamer.svg"
										alt=""
									/>
								</div>
							</Grid>
							<Grid
								item
								lg={7}
								md={7}
								sm={7}
								xs={12}>
								<div className="p-36 h-100 bg-light-gray position-relative">
									<ValidatorForm
										ref="form"
										onSubmit={this.handleFormSubmit}>
										<TextValidator
											className="mb-24 w-100"
											variant="outlined"
											label="Email"
											onChange={this.handleChange}
											type="email"
											name="email"
											value={email}
											validators={['required', 'isEmail']}
											errorMessages={[
												t('general.errorMessages_required'),
												t('general.errorMessages_email_valid'),
											]}
										/>
										<div className="flex flex-middle">
											<Button
												variant="contained"
												color="primary"
												type="submit">
												{t('resetPassword')}
											</Button>
											<span className="ml-16 mr-16">{t('or')}</span>
											<Button
												className="capitalize"
												variant="contained"
												onClick={() =>
													this.props.history.push(
														ConstantList.ROOT_PATH + 'session/signin'
													)
												}>
												{t('sign_in.title')}
											</Button>
										</div>
									</ValidatorForm>
								</div>
							</Grid>
						</Grid>
					</Card>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	resetPassword: PropTypes.func.isRequired,
	login: state.login,
});
export default withRouter(
	connect(mapStateToProps, { resetPassword })(ForgotPassword)
);
