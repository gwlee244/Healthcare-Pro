/*
	Component, where displayed sorted patient`s recepies
	@imported at DoctorProfileTabs
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { connect } from "react-redux";
import TableHead from "@material-ui/core/TableHead";
// Actions
import { getPatientsRecepies } from "../../actions/utilsActions";

const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5
	}
});

class TablePaginationActions extends Component {
	handleFirstPageButtonClick = event => {
		this.props.onChangePage(event, 0);
	};

	handleBackButtonClick = event => {
		this.props.onChangePage(event, this.props.page - 1);
	};

	handleNextButtonClick = event => {
		this.props.onChangePage(event, this.props.page + 1);
	};

	handleLastPageButtonClick = event => {
		this.props.onChangePage(
			event,
			Math.max(
				0,
				Math.ceil(this.props.count / this.props.rowsPerPage) - 1
			)
		);
	};

	render() {
		const { classes, count, page, rowsPerPage, theme } = this.props;

		return (
			<div className={classes.root}>
				<IconButton
					onClick={this.handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label="First Page">
					{theme.direction === "rtl" ? (
						<LastPageIcon />
					) : (
						<FirstPageIcon />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleBackButtonClick}
					disabled={page === 0}
					aria-label="Previous Page">
					{theme.direction === "rtl" ? (
						<KeyboardArrowRight />
					) : (
						<KeyboardArrowLeft />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Next Page">
					{theme.direction === "rtl" ? (
						<KeyboardArrowLeft />
					) : (
						<KeyboardArrowRight />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Last Page">
					{theme.direction === "rtl" ? (
						<FirstPageIcon />
					) : (
						<LastPageIcon />
					)}
				</IconButton>
			</div>
		);
	}
}

TablePaginationActions.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
	withTheme: true
})(TablePaginationActions);

let counter = 0,
	rows = [];
function createData(doctor, meds, order, date) {
	counter += 1;
	return { id: counter, doctor, meds, order, date };
}

const styles = theme => ({
	root: {
		width: "100%"
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: "auto"
	},
	inputAdjustment: {
		width: "100%",
		margin: "1em"
	},
	btnAdd: {
		width: "20%",
		marginRight: "2em"
	}
});

render() {
	const { classes } = this.props;
	const { rowsPerPage, page } = this.state;
	if (patientRecepie == null) {
	} else {
		if (rows.length === 0) {
			for (let i = 0; i < patientRecepie.length; i++) {
				if (
					patientRecepie[i].doctor ===
					`${this.props.user.firstName} ${
						this.props.user.lastName
					}`
				) {
					rows.unshift(
						createData(
							patientRecepie[i].doctor,
							patientRecepie[i].meds,
							patientRecepie[i].order,
							patientRecepie[i].date
						)
					);
				}
			}
		}
	}
}