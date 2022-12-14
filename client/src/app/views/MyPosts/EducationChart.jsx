import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { withStyles } from '@material-ui/styles';

const EducationChart = ({ height, color = [], theme }) => {
	var randomColor = require('randomcolor');
	var color = randomColor({
		luminosity: 'dark',
	});
	const option = {
		barGap: 50,
		barMaxWidth: '6px',

		grid: {
			top: 30,
			left: 36,
			right: 26,
			bottom: 40,
		},

		legend: {
			itemGap: 32,
			top: -4,
			left: -4,
			icon: 'circle',
			width: 'auto',
			data: ['Angular', 'React', 'Javascript'],
			textStyle: {
				color: theme.palette.text.secondary,
				fontSize: 12,
				fontFamily: 'roboto',
				align: 'center',
			},
		},
		tooltip: {},
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			showGrid: false,
			boundaryGap: false,
			axisLine: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			axisLabel: {
				color: theme.palette.text.secondary,
				fontSize: 12,
				fontFamily: 'roboto',
				margin: 16,
			},
			axisTick: {
				show: false,
			},
		},
		color: color,
		yAxis: {
			type: 'value',
			show: true,
			axisLine: {
				show: false,
			},
			splitLine: {
				show: false,
			},
		},
		series: [
			{
				name: 'Active',
				data: [65, 80, 70, 100, 90, 70, 55],
				type: 'bar',
				itemStyle: {
					barBorderRadius: [10, 10, 10, 10],
				},
				color: color,
				stack: 'one',
			},
		],
	};
	return (
		<ReactEcharts
			style={{ height: height }}
			option={{
				...option,
			}}
		/>
	);
};

export default withStyles({}, { withTheme: true })(EducationChart);
