import React, { Component } from 'react';
import {
	Card,
	MenuItem,
	Divider,
	IconButton,
	Icon,
	Hidden,
	ButtonGroup,
	Button,
} from '@material-ui/core';
import history from 'history.js';

import { Breadcrumb, SimpleCard } from 'egret';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Grid, InputAdornment } from '@material-ui/core';
import {
	EgretSidenavContainer,
	EgretSidenav,
	EgretSidenavContent,
} from 'egret';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

import './PostDetail.scss';
import LikeShare from '../LikeShare/LikeShare';
import Comment from '../LikeShare/Comment';
import axios from 'axios';
import ConstantList from '../../appConfig';
import Loading from 'egret/components/EgretLoadable/Loading';
import {
	getArticleById,
	deleteArticleById,
	editArticleById,
} from '../forum/ForumService';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './CreatePost.scss';
import { toast } from 'react-toastify';
import ConfirmationDialog from './../../../egret/components/ConfirmationDialog';
import Avatar from '@material-ui/core/Avatar';

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

class PostDetail extends Component {
	state = {
		open: true,
		Article: {},
		loading: false,
		changing: false,
		title: '',
		viewCount: null,
		content: '',
		dragClass: '',
		files: [],
		isEmpty: true,
		src: '',
		image: null,
		currentUserId: null,
		authorId: null,
		dialog: false,
		avatar: null,
		category: '',
		isAdmin: false,
	};

	handleChange = (event, source) => {
		event.persist();

		this.setState({
			[event.target.name]: event.target.value,
		});
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
		let currentURL = window.location.href;
		let id = currentURL.slice(currentURL.search('/:') + 2);
		data.append('Title', this.state.title);
		data.append('Content', this.state.content);
		data.append('Category', this.state.category);
		data.append('Thumbnails', this.state.image);

		editArticleById(id, data)
			.then(() => {
				toast.success('Sửa bài thành công!!!');
				history.push(ConstantList.ROOT_PATH + 'personal-post');
			})
			.catch((e) => {
				console.log(e);
				toast.error(e);
			});
	};

	handleCancel = () => {
		this.setState({
			image: null,
			files: [],
			changing: false,
		});
		let currentURL = window.location.href;
		let id = currentURL.slice(currentURL.search('/:') + 2);
		history.push(ConstantList.ROOT_PATH + `page-layouts/post-detail/:${id}`);
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

	handleCheck = () => {
		let currentURL = window.location.href;
		let id = currentURL.slice(currentURL.search('/:') + 2);
		let data = new FormData();
		data.append('id', id);
		data.append('Content', this.state.content);
		data.append('ViewCount', this.state.viewCount);
		data.append('Category', this.state.category);
		data.append('IsActive', true);
		data.append('Thumbnails', this.state.image);

		axios
			.put(ConstantList.API_ENPOINT + `/forum/Article/admin/${id}`, data)
			.then(() => {
				toast.success('Kiểm duyệt thành công!!!');
				history.push(ConstantList.ROOT_PATH + 'user_manager/role');
			})
			.catch((e) => {
				console.log(e);
				toast.error(e);
			})
			.finally(() => {
				toast.success('Kiểm duyệt thành công!!!');
			});
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
	};

	toggleSidenav = () => {
		this.setState({
			open: !this.state.open,
		});
	};

	componentDidMount() {
		this.setState({ loading: true });
		let currentURL = window.location.href;
		let id = currentURL.slice(currentURL.search('/:') + 2);

		axios.get(ConstantList.API_ENPOINT + '/UserInfo').then((res) => {
			this.setState({ currentUserId: res.data.id, isAdmin: res.data.isAdmin });
		});
		getArticleById(id).then((res) => {
			console.log(res);
			if (res && res.data.data) {
				this.setState({ avatar: res.data.authorImage });
				this.setState({ Article: res.data.data });

				this.setState({
					title: this.state.Article.title,
					content: this.state.Article.content,
					category: this.state.Article.category,
					viewCount: this.state.Article.viewCount,
					src:
						this.state.Article.imagePath === null
							? null
							: '/assets/images/' + this.state.Article.imagePath,
					isEmpty: this.state.Article.imagePath === null,
					authorId: this.state.Article.userId,
				});
			}
		});

		this.setState({ loading: false });
		document.querySelector('.scrollable-content').scrollTo({ top: 0, left: 0 });
	}

	handleEdit = () => {
		this.setState({ changing: true });
	};

	openDialog = () => {
		this.setState({ dialog: true });
	};

	closeDialog = () => {
		this.setState({ dialog: false });
	};

	handleDelete = () => {
		let currentURL = window.location.href;
		let id = currentURL.slice(currentURL.search('/:') + 2);
		deleteArticleById(id).then(() => {
			this.setState({ dialog: false });
			history.push(ConstantList.ROOT_PATH + 'forum');
			toast.success('Xóa thành công!');
		});
	};

	render() {
		let currentURL = window.location.href;
		const { t, i18n } = this.props;
		let { dragClass, files, queProgress } = this.state;
		return (
			<>
				<Grid>
					<ConfirmationDialog
						open={this.state.dialog}
						onConfirmDialogClose={this.closeDialog}
						text="Bạn có chắc muốn xóa bài viết này?"
						onYesClick={this.handleDelete}
						Yes="Có"
						No="không"
					/>
				</Grid>
				{this.state.loading === true ? (
					<Loading />
				) : (
					<div className="left-sidenav-card">
						<div className="header-bg" />

						<div className="left-sidenav-card__content mb-24">
							<EgretSidenavContainer>
								<EgretSidenav
									width="300px"
									bgClass="bg-transperant"
									open={this.state.open}
									toggleSidenav={this.toggleSidenav}>
									<div className="left-sidenav-card__sidenav">
										<Hidden smUp>
											<div className="flex flex-end">
												<IconButton onClick={this.toggleSidenav}>
													<Icon>clear</Icon>
												</IconButton>
											</div>
										</Hidden>

										<div className="py-80" />
										<div className="bg-default">
											<MenuItem
												className="pl-32"
												style={{
													display: 'flex',
													flexDirection: 'column',
													justifyContent: 'center',
													alignItems: 'center',
												}}>
												{this.state.avatar ? (
													<Avatar
														className="avatar"
														src={'/assets/images/' + this.state.avatar}
													/>
												) : (
													<div>
														<Avatar
															className="avatar"
															src={
																ConstantList.ROOT_PATH +
																'assets/images/avatar.jpg'
															}
														/>
													</div>
												)}
												{this.state.Article.authorName}
											</MenuItem>
											<MenuItem className="pl-32">
												{this.state.Article.createdDate}
											</MenuItem>
											<MenuItem className="pl-32">
												Số lượt xem:
												{this.state.Article.viewCount}
											</MenuItem>
										</div>
									</div>
								</EgretSidenav>

								<EgretSidenavContent>
									{this.state.currentUserId &&
									this.state.authorId &&
									this.state.currentUserId === this.state.authorId ? (
										<div className="blockButton">
											<ButtonGroup
												className="tool"
												variant="contained"
												aria-label="outlined primary button group">
												<Button
													className="button"
													startIcon={<EditIcon />}
													color="primary"
													onClick={this.handleEdit}>
													Edit
												</Button>
												<Button
													className="button"
													color="secondary"
													startIcon={<DeleteIcon />}
													onClick={this.openDialog}>
													Delete
												</Button>
											</ButtonGroup>
										</div>
									) : (
										<div className="blockButton"></div>
									)}
									<div className="py-40" />
									<div className="pb-2" />
									{this.state.changing ? (
										<SimpleCard title="File Update">
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
															{files.length} file{files.length > 1 ? 's' : ''}{' '}
															selected...
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

											<ValidatorForm ref="form">
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
																inputProps={{ maxLength: 50 }}
																validators={['required']}
																errorMessages="title requred"
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
																inputProps={{ maxLength: 500 }}
																validators={['required']}
																errorMessages="content requred"
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
																	onClick={this.handleFormSubmit}>
																	{t('FileUpload.upload')}
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
									) : (
										<Card
											className="content-card m-4"
											elevation={2}>
											{this.state.Article.imagePath === null ? (
												<div style={{ marginBottom: '24px' }}></div>
											) : (
												<div
													style={{
														display: 'flex',
														justifyContent: 'center',
														width: '100%',
														marginBottom: '24px',
														marginTop: '24px',
													}}>
													<img
														src={
															'/assets/images/' + this.state.Article.imagePath
														}
														style={{
															maxWidth: '100%',
															alignContent: 'center',
														}}
													/>
												</div>
											)}
											<Divider />
											<div className="card-header flex flex-wrap flex-middle ml-8">
												<div className="show-on-mobile">
													<IconButton onClick={this.toggleSidenav}>
														<Icon>short_text</Icon>
													</IconButton>
												</div>
												<div className="hide-on-mobile">
													<div className="pl-16"></div>
												</div>

												<div>{this.state.Article.title}</div>
											</div>
											<Divider />
											<p className="white-space-pre-line p-24 m-0">
												{this.state.Article.content}
											</p>
										</Card>
									)}
								</EgretSidenavContent>
							</EgretSidenavContainer>
						</div>

						<div className="comment">
							<LikeShare
								className="likeShare"
								dataHref={currentURL}
							/>
							<Comment dataHref={'uet-forum.com/' + currentURL.slice(15)} />
						</div>
						{this.state.isAdmin === true ? (
							<div
								style={{
									position: 'fixed',
									zIndex: 1,
									left: '20px',
									bottom: '120px',
								}}>
								<button
									className="button-5"
									onClick={this.handleCheck}>
									Kiểm duyệt
								</button>
							</div>
						) : (
							<div></div>
						)}
					</div>
				)}
			</>
		);
	}
}

export default PostDetail;
