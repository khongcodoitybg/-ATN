import React, { Component } from 'react';
import ConstantList from '../../appConfig';
import {
	Grid,
	Card,
	IconButton,
	Icon,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Tooltip,
	withStyles,
} from '@material-ui/core';
import { Breadcrumb, SimpleCard, EgretListItem1 } from 'egret';
import axios from 'axios';
import moment from 'moment';

import './News.scss';
import Loading from 'egret/components/EgretLoadable/Loading';

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

class News extends Component {
	productList = [
		{
			imgUrl: ConstantList.ROOT_PATH + 'assets/images/logos/angular.png',
			name: 'Angular Beyond the Basics',
			price: 100,
			available: 15,
			link: 'https://angular.io/start',
		},
		{
			imgUrl: ConstantList.ROOT_PATH + 'assets/images/logos/react.png',
			name: 'React Development Course',
			price: 150,
			available: 30,
			link: 'https://reactjs.org/',
		},
		{
			imgUrl: ConstantList.ROOT_PATH + 'assets/images/logos/webpack.png',
			name: 'Webpack for Busy Developer',
			price: 190,
			available: 35,
			link: 'https://webpack.js.org/guides/development/',
		},
		{
			imgUrl: ConstantList.ROOT_PATH + 'assets/images/logos/sass.png',
			name: 'Complete SASS course',
			price: 100,
			available: 0,
			link: 'https://www.udemy.com/course/sasscourse/?utm_source=adwords&utm_medium=udemyads&utm_campaign=WebDevelopment_v.PROF_la.EN_cc.ROW_ti.8322&utm_content=deal4584&utm_term=_._ag_80385736035_._ad_535397279751_._kw__._de_c_._dm__._pl__._ti_dsa-774930032609_._li_1028580_._pd__._&matchtype=&gclid=Cj0KCQjw-fmZBhDtARIsAH6H8qhYGOsXtb85HEzSrQD0dzkKsto5sx4yPNJHn0wS62rZ8Lv60QGCJ1saAvfKEALw_wcB',
		},
		{
			imgUrl: ConstantList.ROOT_PATH + 'assets/images/logos/bootstrap.png',
			name: 'Bootstrap for Everyone',
			price: 119,
			available: 5,
			link: 'https://getbootstrap.com/',
		},
	];

	state = { dataArticle: [], dataCovid: [], loading: false };
	async componentDidMount() {
		const today = moment().startOf('day').toISOString(true);
		const priorDate = moment()
			.startOf('day')
			.subtract(11, 'days')
			.toISOString(true);

		axios
			.get(
				`https://api.covid19api.com/country/vietnam?from=${priorDate}&to=${today}`
			)
			.then((res) => {
				// console.log(res);
				let data = res && res.data ? res.data : [];
				if (data && data.length > 0) {
					data.map((item) => {
						item.Date = moment(item.Date).format('DD/MM/YYYY');
						return item;
					});
				}
				data = data.reverse();
				this.setState({ dataCovid: data });
			})
			.catch((e) => {
				console.log(e);
			});
		await fetch(
			'https://newsdata.io/api/1/news?apikey=pub_126601c28ddf619e4b5fc2603efd83790f113'
		)
			.then((res) => res.json())
			.then((res) => {
				// console.log(res.results);
				let data = res && res.results ? res.results : [];
				this.setState({ dataArticle: data });
			})
			.catch((e) => {
				console.log(e);
			});

		this.setState({ loading: false });
		document.querySelector('.scrollable-content').scrollTo({ top: 0, left: 0 });
	}

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
			<div className="learning-management m-sm-30">
				<div className="mb-sm-30">
					<Breadcrumb
						t={t}
						i18n={i18n}
						routeSegments={[
							{
								name: t('Dashboard.home'),
							},
						]}
					/>
				</div>{' '}
				{this.state.loading === true ? (
					<Loading />
				) : (
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
								className="welcome-card bg-primary p-sm-24 mb-24  flex flex-space-between">
								<div className="pr-16">
									<h4 className="font-size-22 font-weight-normal m-0 mb-8 text-white">
										{t('Welcome! This is News')}
									</h4>
									<p className="m-0 text-muted-white">
										{t('Have a nice day! My friend')}
									</p>
								</div>
								<img
									src={
										ConstantList.ROOT_PATH +
										'assets/images/illustrations/designer.svg'
									}
									alt="designer"
								/>
							</Card>

							<Card
								elevation={6}
								className="mb-24"
								style={{ marginTop: '60px' }}>
								{/* <div className="card-title px-24 mb-8">Popular Courses</div> */}
								<div className="overflow-auto">
									<Table className="product-table">
										<TableHead
											style={{
												width: '100%',
												backgroundColor: '#88c5de',
											}}>
											<TableRow>
												<TableCell
													className="px-24"
													colSpan={13}
													style={{ fontSize: '20px' }}>
													{t('Covid 19 in Viet Nam')}
												</TableCell>
											</TableRow>
										</TableHead>
										<TableHead>
											<TableRow>
												<TableCell
													className="px-24"
													colSpan={4}>
													{t('Date')}
												</TableCell>
												<TableCell
													className="px-0"
													colSpan={3}>
													{t('Confirmed')}
												</TableCell>
												<TableCell
													className="px-0"
													colSpan={3}>
													{t('Active')}
												</TableCell>
												<TableCell
													className="px-0"
													colSpan={3}>
													{t('Deaths')}
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{this.state.dataCovid.length > 0 &&
												this.state.dataCovid.map((item) => {
													return (
														<TableRow key={item.ID}>
															<TableCell
																className="px-0 capitalize"
																colSpan={4}
																align="left">
																<div className="flex flex-middle">
																	<p className="m-0 ml-8">{item.Date}</p>
																</div>
															</TableCell>
															<TableCell
																className="px-0 capitalize"
																colSpan={3}
																align="left">
																<div className="flex flex-middle">
																	<p className="m-0 ml-8">{item.Confirmed}</p>
																</div>
															</TableCell>
															<TableCell
																className="px-0 capitalize"
																align="left"
																colSpan={3}>
																<div className="flex flex-middle">
																	<p className="m-0 ml-8">{item.Active}</p>
																</div>
															</TableCell>

															<TableCell
																className="px-0"
																align="left"
																colSpan={3}>
																<div className="flex flex-middle">
																	<p className="m-0 ml-8">{item.Deaths}</p>
																</div>
															</TableCell>
														</TableRow>
													);
												})}
										</TableBody>
									</Table>
								</div>
							</Card>

							<div className="mb-12">
								<Grid
									container
									spacing={3}>
									{this.state.dataArticle &&
										this.state.dataArticle.length > 0 &&
										this.state.dataArticle.map((item, index) => {
											return (
												<Grid
													key={index}
													item
													md={6}
													xs={12}>
													<a
														className="article"
														href={item.link}
														style={{ textDecoration: 'none' }}>
														<SimpleCard title={item.title}>
															<div
																style={{
																	marginTop: '-8px',
																	width: '100%',
																	height: '200px',
																	background: `url(${item.image_url}) no-repeat center`,
																	backgroundRepeat: 'no-repeat',
																}}></div>
														</SimpleCard>
													</a>
												</Grid>
											);
										})}
								</Grid>
							</div>

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
																<Icon color="secondary">
																	play_circle_filled
																</Icon>
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
								</div>
							</Card>
						</Grid>
					</Grid>
				)}
			</div>
		);
	}
}

export default withStyles({}, { withTheme: true })(News);
