import React from "react";
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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import TableHead from "@material-ui/core/TableHead";
// Actions
import {
	sendRecepie,
	getPatientsRecepies
} from "../../actions/utilsAction";
const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5
	}
});
class TablePaginationActions extends React.Component {
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
function createData(doctor, meds, dosage, units, instructions, date) {
	counter += 1;
	return { id: counter, doctor, meds, dosage, units, instructions, date };
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
	},
	tableHead: {
		backgroundColor: '#708090',
		color: 'white'
	  }
});
class Recepies extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			rowsPerPage: 5,
			meds: "",
			dosage: "",
			units: "",
			instructions: ""
		};
		this.handleChangePage = this.handleChangePage.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
		this.onAddRecepie = this.onAddRecepie.bind(this);
	}
	handleChangePage = (event, page) => {
		this.setState({ page });
	};
	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};
	componentDidMount = () => {
		this.props.getPatientsRecepies(this.props.user._id);
	};
	onAddRecepie = () => {
		let now = new Date();
		const recepie = {
			meds: this.state.meds,
			dosage: this.state.dosage,
			units: this.state.units,
			instructions: this.state.instructions,
			date: `${now.getHours()}:${now.getMinutes()}, ${now.getDate()}.${now.getMonth() +
				1}.${now.getFullYear()}`,
			doctor: `${this.props.auth.user.firstName} ${
				this.props.auth.user.lastName
			}`
		};
		this.props.sendRecepie(recepie, this.props.user._id);
		this.setState({ meds: "", dosage: "", units: "", instructions: "" });
		rows.unshift(
			createData(
				recepie.doctor,
				recepie.meds,
				recepie.dosage,
				recepie.units,
				recepie.instructions,
				recepie.date
			)
		);
	};
	render() {
		const { classes } = this.props;
		const { rowsPerPage, page } = this.state;
		const emptyRows =
			rowsPerPage -
			Math.min(rowsPerPage, rows.length - page * rowsPerPage);
		let { patientRecepie } = this.props.general;
		if (patientRecepie == null) {
		} else {
			if (rows.length === 0) {
				for (let i = 0; i < patientRecepie.length; i++) {
					rows.unshift(
						createData(
							patientRecepie[i].doctor,
							patientRecepie[i].meds,
							patientRecepie[i].dosage,
							patientRecepie[i].units,
							patientRecepie[i].instructions,
							patientRecepie[i].date
						)
					);
				}
			}
		}
		return (
			<Paper className={classes.root}>
				<div className="flex flex-center">
					<TextField
						multiline
						value={this.state.meds}
						onChange={ev =>
							this.setState({ meds: ev.target.value })
						}
						placeholder="What medicine would you like to prescribe?"
						label="Medicines"
						className={classes.inputAdjustment}
						variant="outlined"
					/>
					<TextField
						multiline
						value={this.state.dosage}
						onChange={ev =>
							this.setState({ dosage: ev.target.value })
						}
						placeholder="What is the dosage?"
						label="Dosage"
						className={classes.inputAdjustment}
						variant="outlined"
					/>
					<TextField
						multiline
						value={this.state.units}
						onChange={ev =>
							this.setState({ units: ev.target.value })
						}
						placeholder="What are the units?"
						label="Units"
						className={classes.inputAdjustment}
						variant="outlined"
					/>
					<TextField
						multiline
						value={this.state.instructions}
						onChange={ev =>
							this.setState({ instructions: ev.target.value })
						}
						placeholder="What are the instructions for use?"
						label="Instructions"
						className={classes.inputAdjustment}
						variant="outlined"
					/>
					<Button
						variant="contained"
						onClick={this.onAddRecepie}
						className={classes.btnAdd}
						color="secondary">
						Add
					</Button>
				</div>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow className={classes.tableHead} stickyHeader="true">
								<TableCell className={classes.tableHead}>Doctor</TableCell>
								<TableCell className={classes.tableHead}>Medicine</TableCell>
								<TableCell className={classes.tableHead}>Dosage</TableCell>
								<TableCell className={classes.tableHead}>Units</TableCell>
								<TableCell className={classes.tableHead}>Instructions</TableCell>
								<TableCell className={classes.tableHead}>Date</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map(row => {
									return (
										<TableRow key={row.id}>
											<TableCell
												style={{ fontSize: "1.2em" }}
												component="th"
												scope="row">
												{row.doctor}
											</TableCell>
											<TableCell
												style={{ fontSize: "1.2em" }}>
												{row.meds}
											</TableCell>
											<TableCell
												style={{ fontSize: "1.2em" }}>
												{row.dosage}
											</TableCell>
											<TableCell
												style={{ fontSize: "1.2em" }}>
												{row.units}
											</TableCell>
											<TableCell
												style={{ fontSize: "1.2em" }}>
												{row.instructions}
											</TableCell>
											<TableCell
												style={{ fontSize: "1.2em" }}>
												{row.date}
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 48 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									colSpan={3}
									count={rows.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										native: true
									}}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={
										this.handleChangeRowsPerPage
									}
									ActionsComponent={
										TablePaginationActionsWrapped
									}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</Paper>
		);
	}
}
Recepies.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	general: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	general: state.general
});
export default connect(
	mapStateToProps,
	{ sendRecepie, getPatientsRecepies }
)(withStyles(styles)(Recepies));

