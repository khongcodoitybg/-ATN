import React, { Component } from 'react';
import { Icon, Card, Grid, Button, InputAdornment } from '@material-ui/core';
import axios from 'axios';
import { Breadcrumb, SimpleCard } from 'egret';
import {
	ValidatorForm,
	TextValidator,
	SelectValidator,
} from 'react-material-ui-form-validator';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import ConstantList from '../../appConfig';
import 'react-image-crop/dist/ReactCrop.css';
import './CreatePost.scss';
import history from 'history.js';
import { toast } from 'react-toastify';

toast.configure({
	autoClose: 2000,
	draggable: false,
	limit: 3,
});

function CheckBoxLable() {
	const { t, i18n } = useTranslation();
	return (
		<span>
			{t('sign_up.valid_checkbox_title')}{' '}
			<i>
				<b> {t('sign_up.valid_checkbox_content')} </b>
			</i>
		</span>
	);
}

class CreatePost extends Component {
	state = {
		title: '',
		content: '',
		dragClass: '',
		files: [],
		src: null,
		isEmpty: true,
		image: null,
		category: '',
	};

	handleChange = (event, source) => {
		event.persist();

		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleChangeCategory = (event) => {
		this.setState({ category: event.target.value });
	};

	handleClear = () => {
		this.setState({
			files: [],
			src: null,
			isEmpty: true,
			image: null,
		});
	};

	handleFormSubmit = () => {
		let data = new FormData();
		data.append('Title', this.state.title);
		data.append('Content', this.state.content);
		data.append('Category', this.state.category);
		data.append('Thumbnails', this.state.image);

		axios
			.post(ConstantList.API_ENPOINT + '/forum/Article', data)
			.then(() => {
				history.push(ConstantList.ROOT_PATH + 'forum');
				toast.info('Bài của bạn đang chờ kiểm duyệt!!!');
			})
			.catch((e) => {
				console.log(e);
				toast.error('Có lỗi xảy ra');
			});
		this.setState({
			title: '',
			content: '',
			dragClass: '',
			files: [],
			src: null,
			isEmpty: true,
			image: null,
		});
	};

	handleCancel = () => {
		this.setState({ title: '', content: '' });
		history.push(ConstantList.ROOT_PATH + 'forum');
	};

	onImageLoaded = (image) => {
		this.imageRef = image;
	};
	handleDragStart = (event) => {
		this.setState({ dragClass: 'drag-shadow' });
	};
	handleDragOver = (event) => {
		event.preventDefault();
		this.setState({ dragClass: 'drag-shadow' });
	};
	handleDrop = (event) => {
		event.preventDefault();
		event.persist();
		let files = event.dataTransfer.files;
		if (files && files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () =>
				this.setState({ src: reader.result, isEmpty: false })
			);
			reader.readAsDataURL(files[0]);
		}
		return false;
	};

	handleFileSelect = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			let file = e.target.files[0];
			reader.addEventListener('load', () =>
				this.setState({ src: reader.result, isEmpty: false, image: file })
			);
			reader.readAsDataURL(e.target.files[0]);
		}

		// let { t } = this.props;
		// let files = event.target.files;
		// let list = [];
		// console.log(files);
		// let acceptType = this.props.acceptType.split(";");
		// for (const iterator of files) {
		//   if (iterator.type.split("/").length <= 0 || acceptType.indexOf(iterator.type.split("/")[1]) < 0) {
		//     console.log(acceptType);
		//     console.log(iterator.type.split("/"));
		//     alert(t("general.type_not_accepted"));
		//     break;
		//   }
		//   list.push({
		//     file: iterator,
		//     uploading: false,
		//     error: false,
		//     progress: 0
		//   });
		// }

		// this.setState({
		//   files: [...list]
		// });
	};

	componentDidMount() {
		document.querySelector('.scrollable-content').scrollTo({ top: 0, left: 0 });
	}

	render() {
		const { crop, croppedImageUrl, src } = this.state;
		const { t, i18n } = this.props;
		let { dragClass, files, queProgress } = this.state;
		return (
			<div className="upload-form m-sm-30">
				<div className="mb-sm-30">
					<Breadcrumb
						routeSegments={[
							{ name: t('forum'), path: 'forum' },
							{ name: t('upload') },
						]}
					/>
				</div>
				<SimpleCard title="File Upload">
					{this.state.isEmpty ? (
						<div
							className={`${dragClass} upload-drop-box flex flex-center flex-middle`}
							onDragEnter={this.handleDragStart}
							onDragOver={this.handleDragOver}
							onDrop={this.handleDrop}>
							{this.state.isEmpty ? (
								<span>Drop your files here</span>
							) : (
								<h5 className="m-0">
									{files.length} file{files.length > 1 ? 's' : ''} selected...
								</h5>
							)}
						</div>
					) : (
						<div className="image">
							<div
								className="iconX"
								onClick={this.handleClear}>
								<Icon>clear</Icon>
							</div>
							{this.state.src && (
								<img
									src={this.state.src}
									style={{
										maxWidth: '100%',
										maxHeight: 400,
										alignContent: 'center',
									}}
								/>
							)}
						</div>
					)}
					<div
						className="flex flex-wrap mb-20"
						style={{ marginTop: '10px' }}>
						<label htmlFor="upload-single-file">
							<Button
								size="small"
								className="capitalize"
								component="span"
								variant="contained"
								color="primary">
								<div className="flex flex-middle">
									<Icon className="pr-8">cloud_upload</Icon>
									<span>{t('general.select_file')}</span>
								</div>
							</Button>
						</label>
						<input
							style={{ display: 'none' }}
							onChange={this.handleFileSelect}
							id="upload-single-file"
							type="file"
							accept="image/*"
						/>
					</div>
					<ValidatorForm
						ref="form"
						onSubmit={this.handleFormSubmit}>
						<Grid
							container
							direction="column"
							justifyContent="center"
							alignItems="center">
							<Grid
								spacing={2}
								className="mb-20 mt-20"
								container
								direction="column"
								justifyContent="center"
								alignItems="center">
								<Grid
									item
									className="main">
									<SelectValidator
										variant="outlined"
										className="category"
										validators={['required']}
										errorMessages="category required"
										value={this.state.category}
										label={t('category')}
										onChange={this.handleChangeCategory}>
										<MenuItem value={1}>{t('study corner')}</MenuItem>
										<MenuItem value={2}>{t('entertainment corner')}</MenuItem>
										<MenuItem value={3}>
											{t('foreign language corner')}
										</MenuItem>
										<MenuItem value={4}>{t('document corner')}</MenuItem>
										<MenuItem value={5}>{t('life corner')}</MenuItem>
									</SelectValidator>
								</Grid>
								<Grid
									item
									className="main">
									<TextValidator
										className="titlePost"
										variant="outlined"
										label={
											<span>
												<span style={{ color: 'red' }}> * </span>
												{t('title')}
											</span>
										}
										onChange={this.handleChange}
										type="text"
										name="title"
										value={this.state.title}
										inputProps={{ maxLength: 100 }}
										validators={['required']}
										errorMessages="title required"
									/>
								</Grid>

								<Grid
									item
									className="main">
									<TextValidator
										multiline
										rows={7}
										className="w-100"
										variant="outlined"
										label={
											<span>
												<span style={{ color: 'red' }}> * </span>
												{t('content')}
											</span>
										}
										onChange={this.handleChange}
										type="text"
										name="content"
										value={this.state.content}
										inputProps={{ maxLength: 10000 }}
										validators={['required']}
										errorMessages="content required"
									/>
								</Grid>
							</Grid>
							<Grid
								className="mb-20"
								item
								lg={12}
								md={12}
								sm={12}
								xs={12}>
								<div>
									<div className="flex flex-middle mt-16">
										<Button
											className="capitalize "
											variant="contained"
											color="primary"
											// disabled= {isView}
											type="submit">
											{t('FileUpload.post')}
										</Button>
										<span className="ml-16 mr-8"></span>
										<Button
											className="capitalize"
											variant="contained"
											color="secondary"
											onClick={() => {
												this.handleCancel();
											}}>
											{t('general.cancel')}
										</Button>
									</div>
								</div>
							</Grid>
						</Grid>
					</ValidatorForm>
				</SimpleCard>
			</div>
		);
	}
}

export default CreatePost;
