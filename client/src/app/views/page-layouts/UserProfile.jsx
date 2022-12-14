import React, { Component } from 'react';

import ConstantList from '../../appConfig';
import { Avatar, Grid, Button, withStyles } from '@material-ui/core';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import localStorageService from '../../services/localStorageService';

import { getCurrentUser, saveUser } from './UserProfileService';
import UploadCropImagePopup from './UploadCropImagePopup';
import ChangePasswordDiaglog from './ChangePasswordPopup';

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/views/_style.scss';
import jwtAuthService from 'app/services/jwtAuthService';

const API_PATH = ConstantList.API_ENPOINT + '/api/fileUpload/';

toast.configure({
	autoClose: 1000,
	draggable: false,
	limit: 3,
});
class UserProfile extends Component {
	state = {
		displayName: '',
		firstName: '',
		lastName: '',
		userID: '',
		open: true,
		user: {},
		healthOrg: {},
		shouldOpenImageDialog: false,
		shouldOpenPasswordDialog: false,
		checkHealthOrg: false,
		name: '',
		taxCodeOfTheUnit: '',
		code: '',
		specifyTestPurpose: '',
		address: '',
		specifyLevel: '',
		positiveAffirmativeRight: true,
		shouldOpenSearchDialog: false,
		shouldOpenConfirmationDialog: false,
		qualificationSelect: [],
		qualification: {},
		officerPosion: '',
		unitCodeOfProgramPEQAS: '',
		testpurposeSelect: [],
		testPurpose1: {},
		testPurpose2: {},
		testPurpose3: {},
		testPurpose4: {},
		levelHealOrg: [],
		healthOrgTypeSelect: [],
		healthOrgType: [],
		administrativeUnit: '',
		fax: '',
		isView: false,
		shouldOpenAdministrativeUnitsPopup: false,
		level: {},
		sampleReceiptDate: new Date(),
		sampleRecipient: '',
		specifySampleStatus: '',
		specifyQualification: '',
		isManualSetCode: false,
		hasErrorLever: false,
		levelId: '',
		loading: false,
	};

	windowResizeListener;

	toggleSidenav = () => {
		this.setState({
			open: !this.state.open,
		});
	};

	handleWindowResize = () => {
		return (event) => {
			if (event.target.innerWidth < 768) {
				this.setState({ mobile: true });
			} else this.setState({ mobile: false });
		};
	};

	componentDidMount() {
		getCurrentUser().then(({ data }) => {
			this.setState({ user: data });
			// console.log(this.state.user)

			this.setState({ ...data });
			let { user } = this.state;
			let displayName = user.firstName + ' ' + user.lastName;
			this.setState({
				displayName: displayName,
				firstName: user.firstName,
				lastName: user.lastName,
				userID: user.id,
			});
		});
		//let user = localStorageService.getLoginUser();
		if (window.innerWidth < 768) {
			this.setState({ open: false });
		}
		if (window)
			this.windowResizeListener = window.addEventListener('resize', (event) => {
				if (event.target.innerWidth < 768) {
					this.setState({ open: false });
				} else this.setState({ open: true });
			});
	}
	handleChange = (event, source) => {
		event.persist();

		this.setState({
			[event.target.name]: event.target.value,
		});
		let { firstName, lastName, displayName } = this.state;
		if (source === 'firstName') {
			displayName = event.target.value + ' ' + lastName;
		} else if (source === 'lastName') {
			displayName = firstName + ' ' + event.target.value;
		}

		this.setState({ displayName: displayName });
	};
	componentWillUnmount() {
		let user = localStorageService.getLoginUser();
		this.setState({ user: user });
		this.setState(user);
		if (window) window.removeEventListener('resize', this.windowResizeListener);
	}
	handleOpenUploadDialog = () => {
		this.setState({
			shouldOpenImageDialog: true,
		});
	};
	handleDialogClose = () => {
		this.setState({
			shouldOpenImageDialog: false,
		});
	};
	handleOpenPasswordDialog = () => {
		this.setState({
			shouldOpenPasswordDialog: true,
		});
	};
	handleDialogPasswordClose = () => {
		this.setState({
			shouldOpenPasswordDialog: false,
		});
	};

	openPasswordDialog = () => {
		this.setState({
			shouldOpenPasswordDialog: true,
		});
	};
	handleUpdate = (blobValue) => {
		let { t } = this.props;
		const url = ConstantList.API_ENPOINT + '/UpdateAvatarUser';
		let formData = new FormData();
		formData.set('Thumbnails', blobValue);
		//formData.append('uploadfile',file);//Lưu ý tên 'uploadfile' phải trùng với tham số bên Server side

		axios
			.post(url, formData)
			.then((response) => {
				this.handleDialogClose();
				window.location.reload();
				toast.success(t('update_success_message'));
				getCurrentUser().then((data) => {
					jwtAuthService.setLoginUser(data.data);
				});
			})
			.catch(() => {
				toast.warning(t('error_update_image'));
			});
	};
	handleFormSubmit = () => {
		let { id, firstName, lastName } = this.state;
		let { t } = this.props;
		// console.log(healthOrg, checkHealthOrg);
		// this.setState({isView: true});
		let data = new FormData();
		data.append('FirstName', firstName);
		data.append('LastName', lastName);
		data.append('UserName', this.state.user.email);
		saveUser(data)
			.then(() => {
				toast.success('Success!!!');
			})
			.catch((e) => {
				toast.error(e);
			});
	};
	handleFormSubmitAdmin = () => {
		let { id, code, isManualSetCode, email, hasErrorLever, levelId } =
			this.state;
		let { t } = this.props;
		this.setState({ loading: true });

		// if(levelId == "" ){
		//   this.setState({hasErrorLever: true, loading:false});
		//   return
		// }
		if (email != null) {
			// checkEmail(id, email).then((res) => {
			//   if (res.data) {
			//     toast.warning(t("sign_up.duplicate_email"));
			//     this.setState({ loading: false });
			//     return;
			//   }
			// } else {
			//   if (id) {
			//     saveItemHealthOrg({
			//       ...this.state,
			//     }).then(() => {
			//       // this.props.handleOKEditClose();
			//       this.setState({ loading: false });
			//       toast.success(t("mess_edit"));
			//     });
			//   }
			//   // console.log(123);
			// }
			// });
		}

		// console.log(this.state);
	};
	render() {
		let {
			user,

			checkHealthOrg,
		} = this.state;
		let { theme } = this.props;
		let { t, i18n } = this.props;

		return (
			<div className="m-sm-30">
				{this.state.shouldOpenImageDialog && (
					<UploadCropImagePopup
						t={t}
						i18n={i18n}
						handleClose={this.handleDialogClose}
						handleUpdate={this.handleUpdate}
						open={this.state.shouldOpenImageDialog}
						uploadUrl={ConstantList.API_ENPOINT + 'UpdateAvatarUser'}
						acceptType="png;jpg;gif;jpeg"
					/>
				)}
				{this.state.shouldOpenPasswordDialog && (
					<ChangePasswordDiaglog
						t={t}
						i18n={i18n}
						handleClose={this.handleDialogPasswordClose}
						open={this.state.shouldOpenPasswordDialog}
						user={user}
					/>
				)}
				<div>
					{
						<span className="styleColor">
							{checkHealthOrg ? t('user.healthOrg') : t('user.person_info')}
						</span>
					}
				</div>
				<div className="user-profile__sidenav flex-column flex-middle">
					{this.state.user && this.state.user ? (
						<Avatar
							className="avatar mb-20"
							src={'/assets/images/' + this.state.user.avatar}
							onClick={this.handleOpenUploadDialog}
						/>
					) : (
						<div>
							<Avatar
								className="avatar mb-20"
								src={ConstantList.ROOT_PATH + 'assets/images/avatar.jpg'}
								onClick={this.handleOpenUploadDialog}
							/>
						</div>
					)}
					{/* {user.displayName} */}
					{
						<span className="title">
							{' '}
							{this.state.displayName != null
								? this.state.displayName
								: ''}{' '}
						</span>
					}
				</div>

				<ValidatorForm
					ref="form"
					onSubmit={this.handleFormSubmit}
					style={{
						overflowY: 'auto',
						display: 'flex',
						flexDirection: 'column',
					}}>
					<div
						className="m-sm-30"
						t={t}
						i18n={i18n}>
						<Grid
							className="mb-8 mt-8"
							container
							spacing={3}>
							<Grid
								item
								lg={4}
								md={4}
								sm={12}
								xs={12}>
								<TextValidator
									id="standard-basic"
									label={
										<span className="font">
											<span style={{ color: 'red' }}> * </span>
											{t('user.firstName')}
										</span>
									}
									value={this.state.firstName}
									name="firstName"
									onChange={(firstName) =>
										this.handleChange(firstName, 'firstName')
									}
									size="small"
									variant="outlined"
									validators={['required']}
									errorMessages={[t('general.errorMessages_required')]}
									className="w-100"
								/>
							</Grid>

							<Grid
								item
								lg={4}
								md={4}
								sm={12}
								xs={12}>
								<TextValidator
									id="standard-basic"
									label={
										<span className="font">
											<span style={{ color: 'red' }}> * </span>
											{t('user.lastName')}
										</span>
									}
									size="small"
									variant="outlined"
									value={this.state.lastName}
									name="lastName"
									onChange={(lastName) =>
										this.handleChange(lastName, 'lastName')
									}
									validators={['required']}
									errorMessages={[t('general.errorMessages_required')]}
									className="w-100"
								/>
							</Grid>

							<Grid
								item
								lg={4}
								md={4}
								sm={12}
								xs={12}>
								<TextValidator
									id="standard-basic"
									label={
										<span className="font">
											<span style={{ color: 'red' }}> * </span>
											{t('user.displayName')}
										</span>
									}
									size="small"
									variant="outlined"
									value={this.state.displayName}
									validators={['required']}
									errorMessages={[t('general.errorMessages_required')]}
									className="w-100"
								/>
							</Grid>
						</Grid>

						<Grid
							className="mb-10"
							container
							spacing={3}>
							{/* <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth={true}>
              <TextField id="standard-basic"  label={t('user.email')} value={this.state.email != null ? user.email : ''} 
                onChange={this.handleChange}
              />
            </FormControl>
          </Grid> */}
							<Grid
								item
								lg={4}
								md={4}
								sm={12}
								xs={12}>
								<TextValidator
									className="w-100"
									size="small"
									variant="standard"
									label={<span className="font">ID</span>}
									type="text"
									value={this.state.userID}
									validators={['required']}
									disabled
								/>
							</Grid>
							<Grid
								item
								lg={4}
								md={4}
								sm={12}
								xs={12}>
								<TextValidator
									className="w-100"
									label={
										<span className="font">
											<span style={{ color: 'red' }}> * </span>
											{t('user.email')}
										</span>
									}
									size="small"
									variant="outlined"
									type="text"
									name="email"
									value={this.state.email ? this.state.email : ''}
									validators={['required']}
									errorMessages={[t('general.errorMessages_required')]}
								/>
							</Grid>
						</Grid>

						<Grid
							className="mb-10"
							style={{ textAlign: 'right' }}>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								className="mr-16">
								{t('user.save')}
							</Button>
							<Button
								variant="contained"
								color="primary"
								type="button"
								onClick={() => this.openPasswordDialog()}>
								{t('user.changePass')}
							</Button>
						</Grid>
					</div>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles({}, { withTheme: true })(UserProfile);
