import axios from 'axios';
import localStorageService from './localStorageService';
import ConstantList from '../appConfig';
import UserService from '../services/UserService';
import MenuService from '../services/MenuService';
import history from 'history.js';
const config = {
	headers: {
		'Content-Type': 'application/json-patch+json',
		accept: '*/*',
		// Authorization: 'Basic Y29yZV9jbGllbnQ6c2VjcmV0',
	},
};
class JwtAuthService {
	user = {
		roles: ['user'],
		firstName: 'Quang',
		lastName: 'Nguyen',
		email: 'quang@gmail.com',
		password: '123456',
		// token: 'faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh',
	};
	async getCurrentUser() {
		let url = ConstantList.API_ENPOINT + '/UserInfo';
		return await axios.get(url);
	}
	async loginWithUserNameAndPassword(username, password) {
		let requestBody =
			'client_id=core_client&grant_type=password&client_secret=secret';
		requestBody =
			requestBody + '&username=' + username + '&password=' + password;
		const res = await axios
			.post(
				ConstantList.API_ENPOINT + '/login',
				{ email: username, password: password },
				config
			)
			.then((response) => {
				var dateObj = new Date(Date.now() + response.data.expires_in * 1000);
				localStorageService.setItem('token_expire_time', dateObj);
				this.setSession(response.data.data.token);
			});
		//alert('Here')
		await this.getCurrentUser().then((res) => {
			this.setLoginUser(res.data);
		});

		// await MenuService.getAllMenuItemByRoleList().then((res) => {
		// 	//localStorageService.setSessionItem("navigations",res.data);
		// 	localStorageService.setLocalStorageItem('navigations', res.data);
		// });
	}

	loginWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.user);
			}, 1000);
		}).then((data) => {
			//console.log(data);
			this.setUser(data);
			this.setSession(data.token);
			return data;
		});
	};

	loginWithToken = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.user);
			}, 100);
		}).then((data) => {
			this.setSession(data.token);
			this.setUser(data);
			return data;
		});
	};

	async logout() {
		if (ConstantList.AUTH_MODE == 'Keycloak') {
			UserService.doLogout();
			this.setSession(null);
			this.removeUser();
			history.push(ConstantList.HOME_PAGE);
		} else {
			let url = ConstantList.API_ENPOINT + '/logout';
			axios.post(url);
			this.setSession(null);
			this.removeUser();
			history.push(ConstantList.LOGIN_PAGE);
		}
	}

	setSession(token) {
		if (token) {
			localStorageService.setItem('jwt_token', token);
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		} else {
			localStorageService.removeItem('jwt_token');
			delete axios.defaults.headers.common['Authorization'];
		}
	}
	async setLoginUser(user) {
		localStorageService.setItem('auth_user', user);
		return user;
	}
	getLoginUser = () => {
		return localStorageService.getItem('auth_user');
	};
	// setLoginToken = (data) => {
	//   let user ={};
	//   user.token = data;
	//   user.role="ADMIN";
	//   user.age=25;
	//   user.displayName =""; // cần lấy tên user
	//   user.photoURL =ConstantList.ROOT_PATH+"assets/images/avatar.jpg";
	//   this.user = user;
	//   localStorageService.setItem('auth_user', user);
	//   return user;
	// }

	setUser = (user) => {
		localStorageService.setItem('auth_user', user);
	};
	removeUser = () => {
		localStorageService.removeItem('auth_user');
	};
}

export default new JwtAuthService();
