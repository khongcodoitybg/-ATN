import ConstantList from './appConfig';
import localStorageService from './services/localStorageService';
var role = localStorageService.getItem('auth_user');
if (role == null) {
	role = false;
} else if (localStorageService.getItem('auth_user').isAdmin === true) {
	role = true;
} else {
	role = false;
}

export const navigations = [
	{
		name: 'Trang chủ',
		icon: 'home',
		path: ConstantList.ROOT_PATH,
		isVisible: true,
	},
	{
		name: 'Diễn đàn',
		icon: 'dashboard',
		path: ConstantList.ROOT_PATH + 'forum',
		isVisible: true,
	},
	{
		name: 'Bài viết cá nhân',
		icon: 'person',
		path: ConstantList.ROOT_PATH + 'personal-post',
		isVisible: true,
	},
	{
		name: 'Kiểm duyệt',
		icon: 'admin_panel_settings',
		path: ConstantList.ROOT_PATH + 'user_manager/role',
		isVisible: role,
	},
];
