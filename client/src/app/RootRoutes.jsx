import React from 'react';
import { Redirect } from 'react-router-dom';
import homeRoutes from './views/home/HomeRoutes';
import sessionRoutes from './views/sessions/SessionRoutes';
import ConstantList from './appConfig';
import pageLayoutRoutes from './views/page-layouts/PageLayoutRoutees';
import forumRoutes from './views/forum/ForumRoutes';
import personalPostRouter from './views/MyPosts/PersonalPostRoutes';
import RoleRoutes from './views/Role/RoleRoutes';

const redirectRoute = [
	{
		path: ConstantList.ROOT_PATH,
		exact: true,
		component: () => <Redirect to={ConstantList.HOME_PAGE} />, //Luôn trỏ về HomePage được khai báo trong appConfig
	},
];

const errorRoute = [
	{
		component: () => <Redirect to={ConstantList.ROOT_PATH + 'session/404'} />,
	},
];

const routes = [
	...sessionRoutes,
	...homeRoutes,
	...forumRoutes,
	...personalPostRouter,
	...pageLayoutRoutes,
	...RoleRoutes,

	...errorRoute,
];

export default routes;
