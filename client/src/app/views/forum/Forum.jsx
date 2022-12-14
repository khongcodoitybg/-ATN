import ConstantList from '../../appConfig';
import {
	Grid,
	Card,
	IconButton,
	Icon,
	Tooltip,
	Button,
} from '@material-ui/core';
import { Breadcrumb, EgretListItem1 } from 'egret';
import moment from 'moment';
import MaterialTable from 'material-table';
import { PieChart, Pie, Cell, Legend } from 'recharts';

import './forum.scss';
import history from '../../../history';
import * as React from 'react';
import { MTableToolbar } from 'material-table';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Component } from 'react';
import { getArticle, getArticleByCategory } from './ForumService';
import { MuiThemeProvider } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import EducationChart from '../MyPosts/EducationChart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

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

class Forum extends Component {
	productList = [
		{
			imgUrl: ConstantList.ROOT_PATH + 'assets/images/logos/angular.png',
			name: 'Angular Beyond the Basics',
			price: 100,
			available: 15,
		},
		{
			imgUrl: ConstantList.ROOT_PATH + 'assets/images/logos/react.png',
			name: 'React Development Course',
			price: 150,
			available: 30,
		},
		{
			imgUrl: ConstantList.ROOT_PATH + 'assets/images/logos/webpack.png',
			name: 'Webpack for Busy Developer',
			price: 190,
			available: 35,
		},
		{
			imgUrl: ConstantList.ROOT_PATH + 'assets/images/logos/sass.png',
			name: 'Complete SASS course',
			price: 100,
			available: 0,
		},
		{
			imgUrl: ConstantList.ROOT_PATH + 'assets/images/logos/bootstrap.png',
			name: 'Bootstrap for Everyone',
			price: 119,
			available: 5,
		},
	];

	state = {
		postList: [],
		study: [],
		entertainment: [],
		foreignLanguage: [],
		document: [],
		life: [],
		count1: null,
		count2: null,
		count3: null,
		count4: null,
		count5: null,
	};

	componentDidMount() {
		getArticle()
			.then((res) => {
				res && res.data && this.setState({ postList: res.data.data });
			})
			.catch((e) => console.log(e));
		getArticleByCategory(1)
			.then((res) => {
				res &&
					res.data &&
					this.setState({
						study: res.data.data.results.reverse(),
						count1: res.data.data.countResult,
					});
			})
			.catch((e) => console.log(e));
		getArticleByCategory(2)
			.then((res) => {
				res &&
					res.data &&
					this.setState({
						entertainment: res.data.data.results.reverse(),
						count2: res.data.data.countResult,
					});
			})
			.catch((e) => console.log(e));
		getArticleByCategory(3)
			.then((res) => {
				res &&
					res.data &&
					this.setState({
						foreignLanguage: res.data.data.results.reverse(),
						count3: res.data.data.countResult,
					});
			})
			.catch((e) => console.log(e));
		getArticleByCategory(4)
			.then((res) => {
				res &&
					res.data &&
					this.setState({
						document: res.data.data.results.reverse(),
						count4: res.data.data.countResult,
					});
			})
			.catch((e) => console.log(e));
		getArticleByCategory(5)
			.then((res) => {
				res &&
					res.data &&
					this.setState({
						life: res.data.data.results.reverse(),
						count5: res.data.data.countResult,
					});
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

	componentWillUpdate() {}

	render() {
		let { t } = this.props;

		const data = [
			{ name: t('study corner'), value: this.state.count1 },
			{ name: t('entertainment corner'), value: this.state.count2 },
			{ name: t('foreign language corner'), value: this.state.count3 },
			{ name: t('document corner'), value: this.state.count4 },
			{ name: t('life corner'), value: this.state.count5 },
		];

		return (
			<div className="learning-management m-sm-30">
				<div className="mb-sm-30 navForum">
					<Breadcrumb routeSegments={[{ name: t('forum') }]} />

					<Button
						variant="contained"
						className="createButton"
						startIcon={<EditIcon />}
						onClick={() => {
							this.handleClickCreateTopic();
						}}>
						{t('post')}
					</Button>
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
							style={{ marginBottom: '60px' }}>
							<div className="overflow-auto">
								<Grid xs={12}>
									<MuiThemeProvider>
										<MaterialTable
											title={t('study corner')}
											data={this.state.study}
											columns={[
												{
													field: 'title',
													title: t('title'),

													cellStyle: {
														width: '53%',
														minWidth: '53%',
													},
													headerStyle: {
														align: 'center',
														width: '53%',
														minWidth: '53%',
													},
												},
												{
													field: 'createdDate',
													align: 'center',
													title: t('timePost'),
													cellStyle: { width: '11%', minWidth: '11%' },
													headerStyle: {
														align: 'center',
														width: '11%',
														minWidth: '11%',
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
																{moment(rowData.createdDate).format(
																	'DD/MM/YYYY'
																)}
															</p>
														</>
													),
												},
												{
													align: 'center',
													field: 'authorName',
													title: t('author'),
													cellStyle: { width: '30%', minWidth: '30%' },
													headerStyle: {
														width: '30%',
														minWidth: '30%',
														whiteSpace: 'nowrap',
													},
												},
												{
													align: 'right',
													field: 'viewCount',
													title: '',
													cellStyle: { width: '6%', minWidth: '6%' },
													headerStyle: {
														width: '6%',
														minWidth: '6%',
													},
													render: (rowData) => (
														<>
															<span>
																<p
																	style={{
																		position: 'relative',
																		float: 'right',
																		display: 'flex',
																		marginBottom: '0',
																	}}>
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
											components={{
												Toolbar: (props) => (
													<div style={{ backgroundColor: '#63ace5 ' }}>
														<MTableToolbar {...props} />
													</div>
												),
											}}
											options={{
												selection: false,
												paging: true,
												pageSize: 5,
												pageSizeOptions: [5],
												search: true,

												rowStyle: (rowData, index) => ({
													backgroundColor: '#EEE',
												}),
												headerStyle: {},

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
									</MuiThemeProvider>
								</Grid>
							</div>
						</Card>

						<Card
							elevation={6}
							style={{ marginBottom: '60px' }}>
							{/* <div className="card-title px-24 mb-8">Popular Courses</div> */}
							<div className="overflow-auto">
								<Grid xs={12}>
									<MaterialTable
										title={t('entertainment corner')}
										data={this.state.entertainment}
										components={{
											Toolbar: (props) => (
												<div
													style={{
														backgroundColor: 'rgba(44, 130, 201,0.5)  ',
													}}>
													<MTableToolbar {...props} />
												</div>
											),
										}}
										columns={[
											{
												field: 'title',
												title: t('title'),

												cellStyle: {
													width: '53%',
													minWidth: '53%',
												},
												headerStyle: {
													align: 'center',
													width: '53%',
													minWidth: '53%',
												},
											},
											{
												field: 'createdDate',
												align: 'center',
												title: t('timePost'),
												cellStyle: { width: '11%', minWidth: '11%' },
												headerStyle: {
													align: 'center',
													width: '11%',
													minWidth: '11%',
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
												align: 'center',
												field: 'authorName',
												title: t('author'),
												cellStyle: { width: '30%', minWidth: '30%' },
												headerStyle: {
													width: '30%',
													minWidth: '30%',
													whiteSpace: 'nowrap',
												},
											},
											{
												align: 'right',
												field: 'viewCount',
												title: '',
												cellStyle: { width: '6%', minWidth: '6%' },
												headerStyle: {
													width: '6%',
													minWidth: '6%',
												},
												render: (rowData) => (
													<>
														<span>
															<p
																style={{
																	position: 'relative',
																	float: 'right',
																	display: 'flex',
																	marginBottom: '0',
																}}>
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
											pageSize: 5,
											pageSizeOptions: [5],
											search: true,

											rowStyle: (rowData, index) => ({
												backgroundColor: '#EEE',
											}),
											headerStyle: {},

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

						<Card
							elevation={6}
							style={{ marginBottom: '60px' }}>
							{/* <div className="card-title px-24 mb-8">Popular Courses</div> */}
							<div className="overflow-auto">
								<Grid xs={12}>
									<MaterialTable
										title={t('foreign language corner')}
										data={this.state.foreignLanguage}
										components={{
											Toolbar: (props) => (
												<div
													style={{
														backgroundColor: 'rgba(94, 224, 209, 0.7)',
													}}>
													<MTableToolbar {...props} />
												</div>
											),
										}}
										columns={[
											{
												field: 'title',
												title: t('title'),

												cellStyle: {
													width: '53%',
													minWidth: '53%',
												},
												headerStyle: {
													align: 'center',
													width: '53%',
													minWidth: '53%',
												},
											},
											{
												field: 'createdDate',
												align: 'center',
												title: t('timePost'),
												cellStyle: { width: '11%', minWidth: '11%' },
												headerStyle: {
													align: 'center',
													width: '11%',
													minWidth: '11%',
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
												align: 'center',
												field: 'authorName',
												title: t('author'),
												cellStyle: { width: '30%', minWidth: '30%' },
												headerStyle: {
													width: '30%',
													minWidth: '30%',
													whiteSpace: 'nowrap',
												},
											},
											{
												align: 'right',
												field: 'viewCount',
												title: '',
												cellStyle: { width: '6%', minWidth: '6%' },
												headerStyle: {
													width: '6%',
													minWidth: '6%',
												},
												render: (rowData) => (
													<>
														<span>
															<p
																style={{
																	position: 'relative',
																	float: 'right',
																	display: 'flex',
																	marginBottom: '0',
																}}>
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
											pageSize: 5,
											pageSizeOptions: [5],
											search: true,

											rowStyle: (rowData, index) => ({
												backgroundColor: '#EEE',
											}),
											headerStyle: {},

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

						<Card
							elevation={6}
							style={{ marginBottom: '60px' }}>
							{/* <div className="card-title px-24 mb-8">Popular Courses</div> */}
							<div className="overflow-auto">
								<Grid xs={12}>
									<MaterialTable
										title={t('document corner')}
										data={this.state.document}
										components={{
											Toolbar: (props) => (
												<div
													style={{
														backgroundColor: 'rgba(188, 166, 101, 0.6)',
													}}>
													<MTableToolbar {...props} />
												</div>
											),
										}}
										columns={[
											{
												field: 'title',
												title: t('title'),

												cellStyle: {
													width: '53%',
													minWidth: '53%',
												},
												headerStyle: {
													align: 'center',
													width: '53%',
													minWidth: '53%',
												},
											},
											{
												field: 'createdDate',
												align: 'center',
												title: t('timePost'),
												cellStyle: { width: '11%', minWidth: '11%' },
												headerStyle: {
													align: 'center',
													width: '11%',
													minWidth: '11%',
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
												align: 'center',
												field: 'authorName',
												title: t('author'),
												cellStyle: { width: '30%', minWidth: '30%' },
												headerStyle: {
													width: '30%',
													minWidth: '30%',
													whiteSpace: 'nowrap',
												},
											},
											{
												align: 'right',
												field: 'viewCount',
												title: '',
												cellStyle: { width: '6%', minWidth: '6%' },
												headerStyle: {
													width: '6%',
													minWidth: '6%',
												},
												render: (rowData) => (
													<>
														<span>
															<p
																style={{
																	position: 'relative',
																	float: 'right',
																	display: 'flex',
																	marginBottom: '0',
																}}>
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
											pageSize: 5,
											pageSizeOptions: [5],
											search: true,

											rowStyle: (rowData, index) => ({
												backgroundColor: '#EEE',
											}),
											headerStyle: {},

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

						<Card
							elevation={6}
							style={{ marginBottom: '60px' }}>
							{/* <div className="card-title px-24 mb-8">Popular Courses</div> */}
							<div className="overflow-auto">
								<Grid xs={12}>
									<MaterialTable
										title={t('life corner')}
										data={this.state.life}
										components={{
											Toolbar: (props) => (
												<div
													style={{
														backgroundColor: 'rgba(236, 182, 186, 0.5)',
													}}>
													<MTableToolbar {...props} />
												</div>
											),
										}}
										columns={[
											{
												field: 'title',
												title: t('title'),

												cellStyle: {
													width: '53%',
													minWidth: '53%',
												},
												headerStyle: {
													align: 'center',
													width: '53%',
													minWidth: '53%',
												},
											},
											{
												field: 'createdDate',
												align: 'center',
												title: t('timePost'),
												cellStyle: { width: '11%', minWidth: '11%' },
												headerStyle: {
													align: 'center',
													width: '11%',
													minWidth: '11%',
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
												align: 'center',
												field: 'authorName',
												title: t('author'),
												cellStyle: { width: '30%', minWidth: '30%' },
												headerStyle: {
													width: '30%',
													minWidth: '30%',
													whiteSpace: 'nowrap',
												},
											},
											{
												align: 'right',
												field: 'viewCount',
												title: '',
												cellStyle: { width: '6%', minWidth: '6%' },
												headerStyle: {
													width: '6%',
													minWidth: '6%',
												},
												render: (rowData) => (
													<>
														<span>
															<p
																style={{
																	position: 'relative',
																	float: 'right',
																	display: 'flex',
																	marginBottom: '0',
																}}>
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
											pageSize: 5,
											pageSizeOptions: [5],
											search: true,

											rowStyle: (rowData, index) => ({
												backgroundColor: '#EEE',
											}),
											headerStyle: {},

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

						<Card
							elevation={6}
							className=""
							style={{ marginTop: '60px' }}>
							{/* <div className="card-title px-24 mb-8">Popular Courses</div> */}
							<div className="overflow-auto">
								<Table className="product-table">
									<TableHead>
										<TableRow>
											<TableCell
												className="px-24"
												colSpan={4}>
												{t('Course')}
											</TableCell>
											<TableCell
												className="px-0"
												colSpan={2}>
												{t('Fee')}
											</TableCell>
											<TableCell
												className="px-0"
												colSpan={2}>
												{t('Enrolled')}
											</TableCell>
											<TableCell
												className="px-0"
												colSpan={1}>
												{t('Action')}
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{this.productList.map((product, index) => (
											<TableRow key={index}>
												<TableCell
													className="px-0 capitalize"
													colSpan={4}
													align="left">
													<div className="flex flex-middle">
														<img
															className="circular-image-small"
															src={product.imgUrl}
															alt="user"
														/>
														<p className="m-0 ml-8">{product.name}</p>
													</div>
												</TableCell>
												<TableCell
													className="px-0 capitalize"
													align="left"
													colSpan={2}>
													$
													{product.price > 999
														? (product.price / 1000).toFixed(1) + 'k'
														: product.price}
												</TableCell>

												<TableCell
													className="px-0"
													align="left"
													colSpan={2}>
													{product.available ? (
														product.available < 20 ? (
															<small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
																{product.available}
															</small>
														) : (
															<small className="border-radius-4 bg-primary text-white px-8 py-2 ">
																{product.available}
															</small>
														)
													) : (
														<small className="border-radius-4 bg-error text-white px-8 py-2 ">
															{product.available}
														</small>
													)}
												</TableCell>
												<TableCell
													className="px-0"
													colSpan={1}>
													<a href={product.link}>
														<IconButton>
															<Icon color="secondary">play_circle_filled</Icon>
														</IconButton>
													</a>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</Card>
					</Grid>

					<Grid
						item
						lg={4}
						md={4}
						sm={12}
						xs={12}>
						<Card
							style={{}}
							elevation={6}
							className="p-sm-24 h-100">
							<Card
								elevation={0}
								className="upgrade-card bg-light-primary p-sm-24 mb-36">
								<img
									src={
										ConstantList.ROOT_PATH +
										'assets/images/illustrations/upgrade.svg'
									}
									alt="upgrade"
								/>
								<p className="text-muted m-0 py-24">{t('never give up')}</p>
							</Card>

							<div className="mb-36">
								<h5 className="mb-16 font-size-14 font-weight-600 text-hint">
									Achievements
								</h5>
								<div className="flex flex-middle">
									<Tooltip
										title="Completed first course"
										placement="top">
										<img
											src={
												ConstantList.ROOT_PATH +
												'assets/images/badges/badge-1.svg'
											}
											alt="badge"
											height="24px"
										/>
									</Tooltip>
									<Tooltip
										title="Won a challenge"
										placement="top">
										<img
											className="mx-24"
											src={
												ConstantList.ROOT_PATH +
												'assets/images/badges/badge-2.svg'
											}
											alt="badge"
											height="24px"
										/>
									</Tooltip>
									<Tooltip
										title="Won a competition"
										placement="top">
										<img
											src={
												ConstantList.ROOT_PATH +
												'assets/images/badges/badge-3.svg'
											}
											alt="badge"
											height="24px"
										/>
									</Tooltip>
								</div>
							</div>

							<div className="">
								<h5 className="mb-8 font-size-14 font-weight-600 text-hint">
									{t('forum statistic')}
								</h5>
								<EgretListItem1
									title={t('number of members')}
									subtitle="4"
									bulletIcon="web"
									iconColor="error"
									actionIcon="play_circle_outline"></EgretListItem1>

								<EgretListItem1
									title={t('online')}
									subtitle="1"
									bulletIcon="list_alt"
									iconColor="primary"
									actionIcon="play_circle_outline"></EgretListItem1>

								<EgretListItem1
									title={t('number of posts')}
									subtitle={this.state.postList.countResult}
									bulletIcon="description"
									iconColor="secondary"
									actionIcon="play_circle_outline"></EgretListItem1>
							</div>

							<Card
								style={{
									marginTop: '100px',
									display: 'flex',
									justifyContent: 'center',
								}}
								elevation={0}
								className="upgrade-card bg-light-primary p-sm-24 mb-36">
								<div className="pie">
									<PieChart
										width={400}
										height={400}>
										<Pie
											data={data}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={renderCustomizedLabel}
											outerRadius={80}
											fill="#8884d8"
											dataKey="value">
											{data.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Legend
											iconSize={10}
											layout="vertical"
											verticalAlign="top"
										/>
									</PieChart>
								</div>
							</Card>

							<Card
								style={{ marginTop: '100px' }}
								elevation={6}
								className="mb-24">
								<EducationChart height="400px"></EducationChart>
							</Card>
						</Card>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Forum;
