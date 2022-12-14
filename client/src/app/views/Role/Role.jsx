import ConstantList from '../../appConfig';

import {
	Grid,
	Card,
	IconButton,
	Icon,
	Tooltip,
	Button,
} from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { Breadcrumb, EgretListItem1 } from 'egret';
import axios from 'axios';
import moment from 'moment';
import MaterialTable from 'material-table';

import history from '../../../history';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getArticle, getArticlesByAdmin } from '../forum/ForumService';
import { Component } from 'react';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

class Role extends Component {
	state = { postList: [] };

	async componentDidMount() {
		getArticlesByAdmin()
			.then((res) => {
				console.log(res);
				res &&
					res.data &&
					this.setState({ postList: res.data.data.results.reverse() });
			})
			.catch((e) => console.log(e));
		document.querySelector('.scrollable-content').scrollTo({ top: 0, left: 0 });
	}

	handleClickCreateTopic = () => {
		history.push(ConstantList.ROOT_PATH + 'page-layouts/created');
	};

	handleClickCreatePost = () => {
		history.push(ConstantList.ROOT_PATH + 'page-layouts/created');
	};
	handleClickShowPost = (id) => {
		history.push(ConstantList.ROOT_PATH + `page-layouts/post-detail/:${id}`);
	};

	convert = (data) => {
		{
			switch (data) {
				case '1':
					return 'học tập';
					break;

				case '2':
					return 'giải trí';
					break;
				case '3':
					return 'ngoại ngữ';
					break;
				case '4':
					return 'tài liệu';
					break;

				case '5':
					return 'đời sống';
					break;
			}
		}
	};

	render() {
		let { t, i18n } = this.props;
		const data = [
			{ name: t('study corner'), value: 400 },
			{ name: t('entertainment corner'), value: 300 },
			{ name: t('foreign language corner'), value: 300 },
			{ name: t('document corner'), value: 200 },
			{ name: t('life corner'), value: 200 },
		];

		return (
			<div className="m-sm-30">
				<div className="mb-sm-30">
					<Breadcrumb routeSegments={[{ name: t('Dashboard.manage') }]} />
				</div>

				<Grid
					container
					spacing={3}>
					<Grid
						item
						lg={8}
						md={8}
						sm={12}
						xs={12}>
						<Card
							elevation={6}
							className="mb-24">
							{/* <div className="card-title px-24 mb-8">Popular Courses</div> */}
							<div className="overflow-auto">
								<Grid xs={12}>
									<MaterialTable
										title="Kiểm duyệt"
										data={this.state.postList}
										columns={[
											{
												field: 'title',
												title: t('title'),
												cellStyle: { width: '40%', minWidth: '40%' },
												headerStyle: {
													width: '40%',
													minWidth: '40%',
												},
											},
											{
												field: 'createdDate',
												title: t('timePost'),

												cellStyle: {
													width: '25%',
													minWidth: '25%',
													textAlign: 'center',
												},
												headerStyle: {
													textAlign: 'right',
													width: '25%',
													minWidth: '25%',
													whiteSpace: 'nowrap',
												},
												render: (rowData) => (
													<>
														<p
															style={{
																display: 'flex',
																justifyContent: 'center',
																marginBottom: '0',
															}}>
															{moment(rowData.createdDate).format('DD/MM/YYYY')}
														</p>
													</>
												),
											},
											{
												field: 'category',
												title: t('category'),

												cellStyle: { width: '20%', minWidth: '20%' },
												headerStyle: {
													width: '20%',
													minWidth: '20%',
												},
												render: (rowData) => (
													<>
														<p
															style={{
																display: 'flex',
																justifyContent: 'center',
																marginBottom: '0',
															}}>
															{this.convert(rowData.category)}
														</p>
													</>
												),
											},
											{
												align: 'right',
												field: 'viewCount',
												title: t('viewCount'),
												cellStyle: {
													width: '10%',
													minWidth: '10%',
													textAlign: 'center',
												},
												headerStyle: {
													textAlign: 'right',
													width: '10%',
													minWidth: '10%',
												},
												render: (rowData) => (
													<>
														<span>
															<p style={{ display: 'flex', marginBottom: '0' }}>
																<Icon
																	fontSize="small"
																	color="primary">
																	visibility
																</Icon>
																{rowData.viewCount}
															</p>
														</span>
													</>
												),
											},
										]}
										options={{
											selection: false,
											paging: true,
											search: true,

											rowStyle: (rowData, index) => ({
												backgroundColor: index % 2 === 1 ? '#EEE' : '#FFF',
											}),
											headerStyle: {
												backgroundColor: '#EFC050',
												color: '#fff',
											},

											toolbar: true,
										}}
										onRowClick={(event, rowData) => {
											this.handleClickShowPost(rowData.id);
										}}
										localization={{
											body: {
												emptyDataSourceMessage: 'No data',
											},
										}}
									/>
								</Grid>
							</div>
						</Card>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Role;
