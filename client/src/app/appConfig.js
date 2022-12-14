const CHECK_HEALTH_ORG = true;
const CHECK_ERROR_RESULT = true;
// const APPLICATION_PATH="/eqa/react/";//deploy
const APPLICATION_PATH = '/'; //Đặt homepage tại package.json giống như tại đây
module.exports = Object.freeze({
	//ROOT_PATH : "/egret/",
	ROOT_PATH: APPLICATION_PATH,
	ACTIVE_LAYOUT: 'layout1', //layout1 = vertical, layout2=horizontal
	// API_ENPOINT:"http://globits.net:8088/pi",//deveqa
	// API_ENPOINT:"http://globits.net:8090/pi",//eqa
	// API_ENPOINT: 'http://training-api.oceantech.com.vn/cms',
	AUTH_MODE: 'Spring', //"Spring" or "Keycloak"
	LOGIN_PAGE: APPLICATION_PATH + 'session/signin', //Nếu là Spring
	HOME_PAGE: APPLICATION_PATH, //Nếu là Spring
	CHECK_HEALTH_ORG: CHECK_HEALTH_ORG,
	CHECK_ERROR_RESULT: CHECK_ERROR_RESULT,
	// API_ENPOINT: 'http://localhost:5001',
	API_ENPOINT:
		'https://124a-2405-4803-fca6-d930-5583-a19f-876d-9579.ap.ngrok.io',

	// HOME_PAGE:APPLICATION_PATH+"dashboard/learning-management"//Nếu là Keycloak
	// HOME_PAGE:APPLICATION_PATH+"landing3"//Link trang landing khi bắt đầu
});
