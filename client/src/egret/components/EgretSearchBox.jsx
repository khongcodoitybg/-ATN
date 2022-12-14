import React, { Component } from 'react';
import { Icon, IconButton, withStyles } from '@material-ui/core';
import './Search.scss';
import ConstantList from '../../app/appConfig';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { BehaviorSubject } from 'rxjs';
import { throttle } from 'lodash';
import history from 'history.js';

const styles = (theme) => ({
	root: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
});

class EgretSearchBox extends Component {
	constructor(props) {
		super(props);
		this.handleChange1 = debounce(this.handleChange1.bind(this), 1000);
		this.wrapperRef = React.createRef();
	}
	state = {
		open: false,
		searchValue: '',
		searchResults: [],
		resultOpen: false,
	};

	toggle = () => {
		this.setState({ open: !this.state.open });
		this.setState({ searchValue: '', searchResults: [], resultOpen: false });
	};

	handleChange = (e) => {
		this.setState({ searchValue: e.target.value });
		if (e.target.value) {
			this.handleChange1();
		} else {
			this.setState({
				searchResults: [],
			});
		}
	};

	handleChange1() {
		axios
			.get(
				ConstantList.API_ENPOINT +
					`/forum/Article/filterByKey?key=${this.state.searchValue}`
			)
			.then((res) => {
				this.setState({ searchResults: res.data.data.resultFilter });
			});
	}

	componentDidMount() {
		if (this.state.open) {
			document.addEventListener('click', this.handleClick);
		}
	}

	componentWillUnmount() {
		// important
		if (this.state.open) {
			document.removeEventListener('click', this.handleClick);
		}
	}

	handleClick = () => {
		this.setState({ open: false });
	};

	handleClickShowPost = (id) => {
		this.toggle();
		history.push(ConstantList.ROOT_PATH + `page-layouts/post-detail/:${id}`);
	};

	render() {
		let { classes } = this.props;
		return (
			<React.Fragment>
				{!this.state.open && (
					<IconButton onClick={this.toggle}>
						<Icon>search</Icon>
					</IconButton>
				)}

				{this.state.open && (
					<div
						className="egret-search-box"
						ref={this.wrapperRef}>
						<div
							className="render"
							ref={this.myRef}>
							<input
								className="search-box"
								spellCheck={false}
								type="text"
								placeholder="Tìm kiếm"
								value={this.state.searchValue}
								onChange={this.handleChange}
								autoFocus
							/>
							<div className="search-result">
								{this.state.searchResults &&
									this.state.searchResults.map((item) => (
										<div
											className="item"
											onClick={() => {
												this.handleClickShowPost(item.id);
											}}>
											<p className="search-title">{item.title}</p>

											<p className="search-author">
												Tác giả: {item.authorName}
											</p>
										</div>
									))}
							</div>
						</div>
						<IconButton
							onClick={this.toggle}
							className="iconX">
							<Icon>close</Icon>
						</IconButton>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default withStyles(styles, { withTheme: true })(EgretSearchBox);
