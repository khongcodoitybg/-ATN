import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ConstantList from '../../appConfig';
import {
	Icon,
	IconButton,
	MenuItem,
	withStyles,
	MuiThemeProvider,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setLayoutSettings } from 'app/redux/actions/LayoutActions';
import { logoutUser } from 'app/redux/actions/UserActions';
import { PropTypes } from 'prop-types';
import { EgretMenu, EgretSearchBox } from 'egret';
import { isMdScreen } from 'utils';
import { Link } from 'react-router-dom';

import history from 'history.js';

import authService from '../../services/jwtAuthService';

const styles = (theme) => ({
	root: {
		backgroundColor: theme.palette.primary.main,
	},
});

class Layout1Topbar extends Component {
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

	updateSidebarMode = (sidebarSettings) => {
		let { settings, setLayoutSettings } = this.props;

		setLayoutSettings({
			...settings,
			layout1Settings: {
				...settings.layout1Settings,
				leftSidebar: {
					...settings.layout1Settings.leftSidebar,
					...sidebarSettings,
				},
			},
		});
	};

	handleSidebarToggle = () => {
		let { settings } = this.props;
		let { layout1Settings } = settings;

		let mode;
		if (isMdScreen()) {
			mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
		} else {
			mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
		}
		this.updateSidebarMode({ mode });
	};

	handleSignOut = () => {
		this.props.logoutUser();
	};

	changeLanguage = (event) => {
		const { t, i18n } = this.props;
		let l = event.target.value;
		this.setState({ language: l });
		i18n.changeLanguage(l);
		//alert('here');
	};

	componentDidMount() {
		this.setState({ language: window.localStorage.getItem('i18nextLng') });
	}

	render() {
		let imagePath = ConstantList.ROOT_PATH + 'assets/images/avatar.jpg';
		let user = authService.getLoginUser();
		if (user != null && user.avatar != null) {
			imagePath = ConstantList.ROOT_PATH + 'assets/images/' + user.avatar;
		}
		const { t, i18n } = this.props;
		let { theme, settings } = this.props;
		let language = 'en';

		const topbarTheme =
			settings.themes[settings.layout1Settings.topbar.theme] || theme;
		return (
			<MuiThemeProvider theme={topbarTheme}>
				<div className="topbar">
					<div className={`topbar-hold`}>
						<div className="flex flex-space-between flex-middle h-100">
							<div className="flex">
								<IconButton onClick={this.handleSidebarToggle}>
									<Icon>menu</Icon>
								</IconButton>

								<div className="hide-on-mobile">
									{/* <IconButton>
                    <Icon>mail_outline</Icon>
                  </IconButton>

                  <IconButton>
                    <Icon>web_asset</Icon>
                  </IconButton>

                  <IconButton>
                    <Icon>star_outline</Icon>
                  </IconButton> */}
								</div>
							</div>
							<div className="flex flex-middle">
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
							</div>
						</div>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

Layout1Topbar.propTypes = {
	setLayoutSettings: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	setLayoutSettings: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	settings: state.layout.settings,
});

export default withStyles(styles, { withTheme: true })(
	withRouter(
		connect(mapStateToProps, { setLayoutSettings, logoutUser })(Layout1Topbar)
	)
);
