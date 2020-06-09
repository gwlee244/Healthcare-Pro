/*
	Component for doctor, that takes logic of all tabs for main page
	@imported in DoctorHomepage
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import isEmpty from "../../helpers/isempty";
import omitEmpty from "omit-empty";
// Components
import PatientsList from "../PatientProf/PatientsList";
import Stats from "../Stats/Stats";
import Calendar from "../Calendar/Calendar";
import Scheduler from "../Calendar/Scheduler";
import Loader from "../../utils/Loader";
// Actions
import { getDoctorAppointments } from "../../actions/calendarAction";
import { getStats } from "../../actions/utilsAction";
import steth from "../../img/stethoscope.jpg";
import statis from "../../img/stats.jpg";

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

const styles = theme => ({
	// root: {
	// 	flexGrow: 1,
  //   // backgroundColor: theme.palette.background.paper
  //   backgroundColor: "blue",
  //   // height: "100%"
  // },
  topText: {
    textAlign: "center",
    padding: "5%",

  },
  img: {
    width: "100%"
  }
});

class DoctorTabs extends Component {
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
		this.props.getDoctorAppointments(this.props.auth.user.id);
		this.props.getStats(this.props.auth.user.id);
	};

	render() {
		const { classes, appointments, stats } = this.props;
		const { value } = this.state;
		let content = null,
      chartStats = null;
      console.log(value);

		if (isEmpty(omitEmpty(appointments))) {
			content = null;
		} else {
			content = appointments;
		}

		if (isEmpty(omitEmpty(stats))) {
      chartStats = null;
      console.log(chartStats);
		} else {
      chartStats = stats;
      console.log(chartStats);
		}

		return (
			<div>
				<div className="main-doctortabs">
					<AppBar position="static" color="default">
						<Tabs
							value={value}
							onChange={this.handleChange}
							centered>
							<Tab label="Stats" />
							<Tab label="Patients" />
							<Tab label="Upcoming visits" />
						</Tabs>
					</AppBar>

					{value === 0 && (
						<TabContainer>
							{chartStats ? (
								<Stats stats={chartStats} />
							) : (
                <Loader />
              //   <Paper>
              //   <h2 className={classes.topText}>You don't have any statistics to view yet.  Try adding some patients.</h2>
              //   <img className={classes.img} src={statis}></img>
              // </Paper>
							)}
						</TabContainer>
					)}

					{value === 1 && (
						<TabContainer>
							<PatientsList />
						</TabContainer>
					)}

					{value === 2 && (
						<TabContainer>
							{content ? (
								<Scheduler appointments={content} />
							) : (
                <Paper>
                <h2 className={classes.topText}>You don't have any scheduled appointments at this time.  Please try again later.</h2>
                <img className={classes.img} src={steth}></img>
              </Paper>
							)}
							
						</TabContainer>
					)}
				</div>
			</div>
		);
	}
}

DoctorTabs.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	appointments: PropTypes.array.isRequired,
	general: PropTypes.object.isRequired,
	stats: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	appointments: state.appointments,
	general: state.general,
	stats: state.stats
});

export default connect(
	mapStateToProps,
	{ getDoctorAppointments, getStats }
)(withStyles(styles)(DoctorTabs));
