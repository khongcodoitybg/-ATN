import { EgretLoadable } from 'egret';
import ConstantList from '../../appConfig';
import { withTranslation } from 'react-i18next';

const UserProfile = EgretLoadable({
	loader: () => import('./UserProfile'),
});

const Created1 = EgretLoadable({
	loader: () => import('./CreatePost'),
});
const PostDetail1 = EgretLoadable({
	loader: () => import('./PostDetail'),
});
const feedback = EgretLoadable({
	loader: () => import('./Feedback'),
});

const ViewComponent = withTranslation()(UserProfile);
const Created = withTranslation()(Created1);
const PostDetail = withTranslation()(PostDetail1);
const Feedback = withTranslation()(feedback);
const settings = {
	activeLayout: 'layout1',
	layout1Settings: {
		topbar: {
			show: true,
		},
		leftSidebar: {
			show: true,
			mode: 'close',
		},
	},
	layout2Settings: {
		mode: 'full',
		topbar: {
			show: true,
		},
		navbar: { show: false },
	},
	secondarySidebar: { show: false },
	footer: { show: false },
};

const pageLayoutRoutes = [
	{
		path: ConstantList.ROOT_PATH + 'page-layouts/user-profile',
		component: ViewComponent,
		settings,
	},

	{
		path: ConstantList.ROOT_PATH + 'page-layouts/created',
		component: Created,
		settings,
	},
	{
		path: ConstantList.ROOT_PATH + 'page-layouts/post-detail',
		component: PostDetail,
		settings,
	},
	{
		path: ConstantList.ROOT_PATH + 'page-layouts/feedback',
		component: Feedback,
	},
];

export default pageLayoutRoutes;
