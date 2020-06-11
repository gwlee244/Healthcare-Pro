/*
	Component, where patient can set next meeting with doctor
	@imported at DoctorProfileTabs
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
//Helpers
import getEndTime from "../../helpers/getEndTime";
import getAvailableTime from "../../helpers/getAvailableTime";
import startOfWeek from "../../helpers/startOfWeek";
// Actions
import {
	appointmentAdd,
	getPatientAppointments
} from "../../actions/calendarAction";
const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	},
	container: {
		flexDirection: "column",
		width: "50vw",
		margin: "1em auto"
	},
	marginBottom: {
		marginBottom: "5vh"
	},
	bottomButtons: {
		width: "100%"
	},
	cancelButton: {
		marginRigth: "0.5em",
		width: "100%"
	},
	submitButton: {
		marginLeft: "0.5em",
		width: "100%"
	},
	close: {
		padding: theme.spacing.unit / 2
	}
});
const week = startOfWeek(new Date());
let HOURS = null;
class SetMeeting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			day: "",
			time_start: "",
			time_end: "",
			name: `${this.props.auth.user.firstName} ${
				this.props.auth.user.lastName
			}`,
			allowed: false,
			allowedButton: false,
			openSnackBar: false
		};
		this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
		this.formatWeekDay = this.formatWeekDay.bind(this);
		this.onSelectDay = this.onSelectDay.bind(this);
		this.onHourSet = this.onHourSet.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.registerMeet = this.registerMeet.bind(this);
	}
	handleCloseSnackBar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		this.setState({ openSnackBar: false });
	};
	formatWeekDay = (day, date) => {
		return `${day} (${date.getMonth() +
			1}/${date.getDate()}/${date.getFullYear()})`;
	};
	onSelectDay = ev => {
		this.setState({ day: ev.target.value, allowed: true });
		HOURS = getAvailableTime(
			this.props.user.settings.schedule[ev.target.value.toLowerCase()],
			this.props.user.appointments[ev.target.value.toLowerCase()],
			ev.target.value.toLowerCase()
		);
	};
	onHourSet = ev => {
		this.setState({
			time_start: ev.target.value,
			time_end: getEndTime(ev.target.value),
			allowedButton: true
		});
	};
	onCancel = ev => {
		this.setState({
			day: "",
			time_start: "",
			time_end: "",
			name: `${this.props.auth.user.firstName} ${
				this.props.auth.user.lastName
			}`,
			allowed: false,
			allowedButton: false
		});
	};
	registerMeet = ev => {
		let appointment = {
			name: this.state.name,
			time_start: this.state.time_start,
			time_end: this.state.time_end
		};
		this.props.appointmentAdd(
			appointment,
			this.state.day.toLowerCase(),
			this.props.user._id,
			this.props.auth.user.id
		);
		this.setState({ openSnackBar: true });
	};
	componentWillUnmount = () => {
		this.props.getPatientAppointments(this.props.auth.user.id);
	};
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Typography variant="subtitle1" align="center" gutterBottom>
					Here you can set up meeting with your doctor. Just select
					day, available time, and come that day
				</Typography>
				<div className={`${classes.container} flex`}>
					<FormControl>
						<InputLabel>Select day</InputLabel>
						<Select
							value={this.state.day}
							name="weekdays"
							autoWidth={true}
							onChange={this.onSelectDay}
							variant="outlined"
							className={classes.marginBottom}>
							<MenuItem value="Monday">
								{this.formatWeekDay("Monday", week[0])}
							</MenuItem>
							<MenuItem value="Tuesday">
								{this.formatWeekDay("Tuesday", week[1])}
							</MenuItem>
							<MenuItem value="Wednesday">
								{this.formatWeekDay("Wednesday", week[2])}
							</MenuItem>
							<MenuItem value="Thursday">
								{this.formatWeekDay("Thursday", week[3])}
							</MenuItem>
							<MenuItem value="Friday">
								{this.formatWeekDay("Friday", week[4])}
							</MenuItem>
						</Select>
					</FormControl>
					<FormControl disabled={!this.state.allowed}>
						<InputLabel>Select an available time</InputLabel>
						<Select
							value={this.state.time_start}
							name="hours"
							onChange={this.onHourSet}
							variant="outlined"
							className={classes.marginBottom}>
							{HOURS ? (
								HOURS.map(element => (
									<MenuItem
										value={element}
										key={element + "dora"}>
										{element}
									</MenuItem>
								))
							) : (
								<MenuItem value="olol">govno</MenuItem>
							)}
						</Select>
					</FormControl>
					<div className={`${classes.bottomButtons} flex`}>
						<Button
							variant="outlined"
							color="secondary"
							className={classes.cancelButton}
							onClick={this.onCancel}>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="secondary"
							className={classes.submitButton}
							disabled={!this.state.allowedButton}
							onClick={this.registerMeet}>
							Register Meeting
						</Button>
					</div>
				</div>
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open={this.state.openSnackBar}
					autoHideDuration={4000}
					onClose={this.handleCloseSnackBar}
					ContentProps={{
						"aria-describedby": "message-id"
					}}
					message={
						<span id="message-id">Your appointment has been set!</span>
					}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							className={classes.close}
							onClick={this.handleCloseSnackBar}>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</div>
		);
	}
}
SetMeeting.propTypes = {
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
	{ appointmentAdd, getPatientAppointments }
)(withStyles(styles)(SetMeeting));