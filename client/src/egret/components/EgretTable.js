import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { moment } from 'moment';

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

export default function CustomizedTables(postList, onClick) {
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 700 }}
				aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Bài đăng</StyledTableCell>
						<StyledTableCell align="right">Thời gian</StyledTableCell>
						<StyledTableCell align="right">Tác giả</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{postList.map((row, index) => (
						<StyledTableRow
							key={index}
							onClick={onClick(row.id)}>
							<StyledTableCell
								component="th"
								scope="row">
								{row.title}
							</StyledTableCell>
							<StyledTableCell align="right">
								{moment(row.created).format('DD/MM/YYYY')}
							</StyledTableCell>
							<StyledTableCell align="right">{row.author}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
