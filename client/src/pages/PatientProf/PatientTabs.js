/*
	Component that renders tabs for patients, contain all main components and info
	@imported in PatientHomepage
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
// Components
import DoctorsList from "../DoctorProf/DoctorsList";
import PatientDiaryTab from "./PatientDiaryTab";//will need to be write
import PatientRecepiesTab from "./PatientRecepiesTab";//will need to be write
import Calendar from "../Calendar/Calendar";
import { getPatientAppointments } from "../../actions/calendarAction";
import omitEmpty from "omit-empty";
import isEmpty from "../../helpers/isempty";
function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}
const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	}
});
const defProps = {
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: []
};
class PatientTabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange = (event, value) => {
		this.setState({ value });
	};
	componentDidMount = () => {
		this.props.getPatientAppointments(this.props.auth.user.id);
	};
	render() {
		const { classes, appointments } = this.props;
		const { value } = this.state;
		let content = null;
		if (isEmpty(omitEmpty(appointments))) {
			content = null;
		} else {
			content = appointments;
		}
		return (
			<div>
				<div className={classes.root}>
					<AppBar position="static" color="default">
						<Tabs
							value={value}
							onChange={this.handleChange}
							centered>
							<Tab label="Doctors" />
							<Tab label="E-card" />
							<Tab label="Prescriptions" />
							<Tab label="Planned Appointments" />
						</Tabs>
					</AppBar>
					{value === 0 && (
						<TabContainer>
							<DoctorsList />
						</TabContainer>
					)}
					{value === 1 && (
						<TabContainer>
							<PatientDiaryTab />
						</TabContainer>
					)}
					{value === 2 && (
						<TabContainer>
							<PatientRecepiesTab />
						</TabContainer>
					)}
					{value === 3 && (
						<TabContainer>
							{content ? (
								<Calendar appointments={content} />
							) : (
								<Calendar appointments={defProps} />
							)}
						</TabContainer>
					)}
				</div>
			</div>
		);
	}
}
PatientTabs.propTypes = {
	auth: PropTypes.object.isRequired,
	appointments: PropTypes.object,
	general: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	appointments: state.appointments,
	general: state.general
});
export default connect(
	mapStateToProps,
	{ getPatientAppointments }
)(withStyles(styles)(PatientTabs));