import React, { Component } from 'react';
import {
	Icon,
	IconButton,
	Badge,
	Hidden,
	withStyles,
	MuiThemeProvider,
	MenuItem,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { EgretMenu, EgretToolbarMenu, EgretSearchBox } from 'egret';
import { setLayoutSettings } from 'app/redux/actions/LayoutActions';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import history from 'history.js';
import ConstantList from '../../appConfig';
import authService from '../../services/jwtAuthService';
import { logoutUser } from 'app/redux/actions/UserActions';

class Layout2Topbar extends Component {
	state = {
		selectedLanguage: [
			{
				name: 'Tiếng Việt',
				value: 'vi',
			},
			{
				name: 'English',
				value: 'en',
			},
		],
		language: '',
	};

	handleSignOut = () => {
		this.props.logoutUser();
	};

	updateSidebarMode = (sidebarSettings) => {
		let { settings, setLayoutSettings } = this.props;

		setLayoutSettings({
			...settings,
			layout2Settings: {
				...settings.layout2Settings,
				leftSidebar: {
					...settings.layout2Settings.leftSidebar,
					...sidebarSettings,
				},
			},
		});
	};

	changeLanguage = (event) => {
		const { t, i18n } = this.props;
		let l = event.target.value;
		this.setState({ language: l });
		i18n.changeLanguage(l);
		//alert('here');
	};

	handleSidebarToggle = () => {
		let { settings } = this.props;
		let { layout2Settings } = settings;

		let mode =
			layout2Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';

		this.updateSidebarMode({ mode });
	};

	componentDidMount() {
		this.setState({ language: window.localStorage.getItem('i18nextLng') });
	}

	render() {
		let { theme, settings } = this.props;
		let imagePath = ConstantList.ROOT_PATH + 'assets/images/avatar.jpg';
		let user = authService.getLoginUser();
		if (user != null && user.avatar != null) {
			imagePath = ConstantList.ROOT_PATH + 'assets/images/' + user.avatar;
		}
		const { t, i18n } = this.props;

		const topbarTheme =
			settings.themes[settings.layout2Settings.topbar.theme] || theme;
		return (
			<MuiThemeProvider theme={topbarTheme}>
				<Helmet>
					<style>
						{`.topbar {
              background-color: ${topbarTheme.palette.primary.main};
              border-color: ${topbarTheme.palette.divider} !important;
            }
            .topbar .brand__text {
              color: ${topbarTheme.palette.primary.contrastText};
            }
            `}
					</style>
				</Helmet>

				<div className="topbar">
					<div className="flex flex-space-between flex-middle container h-100">
						<div
							className="flex flex-middle brand"
							style={{ cursor: 'pointer' }}
							onClick={() => {
								history.push(ConstantList.ROOT_PATH);
							}}>
							<img
								src={ConstantList.ROOT_PATH + 'assets/images/logos/logo.png'}
								alt="forum-logo"
							/>
							<span className="brand__text">UET FORUM</span>
						</div>
						<div className="mx-auto"></div>
						<div className="flex flex-middle">
							<EgretToolbarMenu offsetTop="80px">
								<EgretSearchBox />

								<select
									className="form-control language-selector"
									onChange={this.changeLanguage}
									value={this.state.language}>
									{this.state.selectedLanguage.map((item) => (
										<option
											key={item.value}
											value={item.value}>
											{item.name}
										</option>
									))}
								</select>

								<EgretMenu
									menuButton={
										<img
											className="mx-8 text-middle circular-image-small cursor-pointer"
											src={imagePath}
											alt="user"
										/>
									}>
									<MenuItem
										style={{ minWidth: 185 }}
										onClick={() => {
											history.push(ConstantList.ROOT_PATH);
										}}>
										<Icon> home </Icon>
										<span className="pl-16"> {t('Dashboard.dashboard')} </span>
									</MenuItem>
									<MenuItem
										style={{ minWidth: 185 }}
										onClick={() => {
											history.push(
												ConstantList.ROOT_PATH + 'page-layouts/user-profile'
											);
										}}>
										<Icon> person </Icon>
										<span className="pl-16"> {t('Dashboard.profile')} </span>
									</MenuItem>
									<MenuItem
										onClick={this.handleSignOut}
										className="flex flex-middle"
										style={{ minWidth: 185 }}>
										<Icon> power_settings_new </Icon>
										<span className="pl-16"> {t('Dashboard.logout')} </span>
									</MenuItem>
								</EgretMenu>
							</EgretToolbarMenu>

							<Hidden mdUp>
								<IconButton onClick={this.handleSidebarToggle}>
									<Icon>menu</Icon>
								</IconButton>
							</Hidden>
						</div>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

Layout2Topbar.propTypes = {
	setLayoutSettings: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	setLayoutSettings: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	settings: state.layout.settings,
});

export default withStyles({ withTheme: true })(
	withRouter(
		connect(mapStateToProps, { setLayoutSettings, logoutUser })(Layout2Topbar)
	)
);
