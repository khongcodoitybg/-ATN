import axios from 'axios';
import ConstantList from '../../appConfig';
const API_PATH = ConstantList.API_ENPOINT + '/forum';

export const getArticle = () => {
	var url = API_PATH + '/Article';
	return axios.get(url);
};

export const getArticleOfMe = () => {
	var url = API_PATH + '/Article/getArticlesOfMe';
	return axios.get(url);
};

export const getArticlesByAdmin = () => {
	var url = API_PATH + '/Article/getArticlesByAdmin';
	return axios.get(url);
};

export const getArticleById = (id) => {
	var url = API_PATH + `/Article/${id}`;
	return axios.get(url);
};

export const deleteArticleById = (id) => {
	var url = API_PATH + `/Article/${id}`;
	return axios.delete(url);
};

export const editArticleById = (id, data) => {
	var url = API_PATH + `/Article/${id}`;
	return axios.put(url, data);
};

export const getArticleByCategory = (category) => {
	var url = API_PATH + `/Article/category/${category}`;
	return axios.get(url);
};
