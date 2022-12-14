import { EgretLoadable } from 'egret';
import ConstantList from '../../appConfig';
import { withTranslation } from 'react-i18next';

const forum = EgretLoadable({
	loader: () => import('./Forum'),
});

const Forum = withTranslation()(forum);

const forumRoutes = [
	{
		path: ConstantList.ROOT_PATH + 'forum',
		component: Forum,
	},
];

export default forumRoutes;
