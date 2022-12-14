import { EgretLoadable } from 'egret';
import ConstantList from '../../appConfig';
import { withTranslation } from 'react-i18next';

const News = EgretLoadable({
	loader: () => import('./News'),
});
const Home = withTranslation()(News);

const homeRoutes = [
	{
		path: ConstantList.ROOT_PATH,
		component: Home,
		exact: true,
	},
];

export default homeRoutes;
