const Layout2Settings = {
	mode: 'contained', // boxed | contained | full
	topbar: {
		show: true,
		fixed: true,
		theme: 'white', // View all valid theme colors inside EgretTheme/themeColors.js
	},
	navbar: {
		show: true,
		theme: 'slateDark2',
	},

	leftSidebar: {
		show: true,
		mode: 'full', // full, close, compact, mobile,
		theme: 'slateDark1', // View all valid theme colors inside EgretTheme/themeColors.js
		bgOpacity: 0.8, // 0 ~ 1
		bgImgURL: '/assets/images/sidebar/sidebar-bg-dark.jpg',
	},
};

export default Layout2Settings;
