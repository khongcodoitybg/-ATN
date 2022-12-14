import React, { Component } from 'react';
import ConstantList from '../../appConfig';
import {
	Card,
	Checkbox,
	FormControlLabel,
	Grid,
	Button,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { createUser } from './SignUpService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
	autoClose: 2000,
	draggable: false,
	limit: 3,
});

class SignUp extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		rePassword: '',
		agreement: false,
	};

	handleChange = (event) => {
		event.persist();
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleFormSubmit = (event) => {
		let user = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.rePassword,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			isAdmin: false,
			roles: ['user'],
		};
		if (this.state.password.trim() !== this.state.rePassword.trim()) {
			alert('Mật khẩu nhập lại không trùng khớp!!!');
		} else {
			createUser(user)
				.then((result) => {
					toast.success(result.data.message);
					this.props.history.push(ConstantList.ROOT_PATH + 'session/signin');
				})
				.catch((error) => {
					toast.error('Có lỗi xảy ra');
				});
		}
	};
	render() {
		let { firstName, lastName, email, password, rePassword } = this.state;
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
								<div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
									<img
										src="/assets/images/illustrations/posting_photo.svg"
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
								<div className="p-36 h-100">
									<ValidatorForm
										ref="form"
										onSubmit={this.handleFormSubmit}>
										<div className="info mb-24">
											<TextValidator
												className="firstName"
												variant="outlined"
												label="Họ"
												onChange={this.handleChange}
												type="text"
												name="firstName"
												value={firstName}
												validators={['required']}
												errorMessages={['this field is required']}
											/>
											<TextValidator
												className="lastName"
												variant="outlined"
												label="Tên"
												onChange={this.handleChange}
												type="text"
												name="lastName"
												value={lastName}
												validators={['required']}
												errorMessages={['this field is required']}
											/>
										</div>
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
												'this field is required',
												'email is not valid',
											]}
										/>
										<TextValidator
											className="mb-16 w-100"
											label="Mật khẩu"
											variant="outlined"
											onChange={this.handleChange}
											name="password"
											type="password"
											value={password}
											validators={['required']}
											errorMessages={['this field is required']}
										/>
										<TextValidator
											className="mb-24 w-100"
											variant="outlined"
											label="Nhập lại mật khẩu"
											onChange={this.handleChange}
											type="password"
											name="rePassword"
											value={rePassword}
											validators={['required']}
											errorMessages={['this field is required']}
										/>
										<FormControlLabel
											className="mb-16"
											name="agreement"
											onChange={(event) => {
												this.setState({ agreement: event.target.checked });
											}}
											control={<Checkbox />}
											checked={this.state.agreement}
											label="Tôi đồng ý với điều khoản và dịch vụ."
										/>
										<div className="flex flex-middle">
											<Button
												disabled={!this.state.agreement}
												className="capitalize"
												variant="contained"
												color="primary"
												type="submit">
												Đăng ký
											</Button>
											<span className="ml-16 mr-8">or</span>
											<Button
												style={{ color: '#ff5e19', fontWeight: '600' }}
												className="capitalize"
												onClick={() =>
													this.props.history.push(
														ConstantList.ROOT_PATH + 'session/signin'
													)
												}>
												Đăng nhập
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
	// setUser: PropTypes.func.isRequired
});

export default connect(mapStateToProps, {})(SignUp);
