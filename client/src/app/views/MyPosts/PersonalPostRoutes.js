import { EgretLoadable } from 'egret';
import ConstantList from '../../appConfig';
import { withTranslation } from 'react-i18next';

const personalPost = EgretLoadable({
	loader: () => import('./PersonalPost'),
});

const PersonalPost = withTranslation()(personalPost);

const personalPostRouter = [
	{
		path: ConstantList.ROOT_PATH + 'personal-post',
		component: PersonalPost,
	},
];

export default personalPostRouter;
