/*
  Component that shows in Doctor profile, under name card, to give access to additional indo, and features
  @imported in DoctorProfile
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import EventIcon from "@material-ui/icons/Event";
import FaceIcon from "@material-ui/icons/Face";
import HealingIcon from "@material-ui/icons/Healing";
import StarIcon from "@material-ui/icons/Star";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PlaceIcon from "@material-ui/icons/Place";
import CabinetIcon from "@material-ui/icons/MeetingRoom";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import SchoolIcon from "@material-ui/icons/School";
// Components
 import DoctorSchedule from "./Schedule";
import SortedRecepies from "./SortedRecepies";
import SetMeeting from "./SetMeeting";

const NOT_AVAILABLE = "N/A";

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
	},
	infoItems: {
		marginLeft: ".5em",
    fontSize: "1.3em"
  },
  phoneLink: {
    color: "black"
  }

});

class DoctorProfileTabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
		this.renderSwitch = this.renderSwitch.bind(this);
		this.generalInfo = this.generalInfo.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	renderSwitch(arg) {
		switch (arg) {
			case "0-3":
				return "Up to 3 years of med practice";
			case "3-5":
				return "5 years of med practice";
			case "5-10":
				return "Almost 10 years of med practice";
			case "10-15":
				return "15 years of med practice";
			case "15+":
				return "More than 15 years of med practice";
			default:
				return "N/A";
		}
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	generalInfo(settings, classes) {
		return (
			<div className="profileGrid">
				{/* university */}
				<div className="flex flex-center universityInfo">
					<SchoolIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.university
							? `Studied at ${settings.university.univName}, in the city of ${
									settings.university.univCity
							  } for ${
									settings.university.univSpecialty
							  }. Years of study: (${
									settings.university.yearOfEntry
							  } - ${settings.university.yearOfOut})`
							: `Studied at: ${NOT_AVAILABLE}`}
					</Typography>
				</div>

				{/* specialty */}
				<div className="flex flex-center">
					<HealingIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.specialty ? `Specialty: ${settings.specialty}` : `Specialty: ${NOT_AVAILABLE}`}
					</Typography>
				</div>

				{/* clinic name */}
				<div className="flex flex-center">
					<LocalHospitalIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.clinicName ? `Clinic: ${settings.clinicName}` : `Clinic ${NOT_AVAILABLE}`}
					</Typography>
				</div>

				{/* clinic address */}
				<div className="flex flex-center">
					<PlaceIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.address
							? `Address: ${settings.address.city} ${
									settings.address.street
							  } ${settings.address.number}`
							: `Address: ${NOT_AVAILABLE}`}
					</Typography>
				</div>

				{/* work phone */}
				<div className="flex flex-center">
					<PhoneIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
									{ settings.workPhone ? <a className={classes.phoneLink} href = {`tel:${settings.workPhone}`}>Phone: {settings.workPhone}</a> : `Phone: ${NOT_AVAILABLE}`}
					
					</Typography>
				</div>

				{/* birthday */}
				<div className="flex flex-center">
					<EventIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.birthday ? `Birthday: ${settings.birthday}` : `Birthday: ${NOT_AVAILABLE}`}
					</Typography>
				</div>

				{/* sex */}
				<div className="flex flex-center">
					<FaceIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.sex ? `Gender: ${settings.sex}` : `Gender: ${NOT_AVAILABLE}`}
					</Typography>
				</div>

				{/* years of practice */}
				<div className="flex flex-center">
					<StarIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.yearsOfPractice ? `Years Practicing: ${settings.yearsOfPractice}` : `Years Practicing: ${NOT_AVAILABLE}`}
					</Typography>
				</div>

				{/* cabinet */}
				<div className="flex flex-center">
					<CabinetIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.cabinet ? `Office #${settings.cabinet}` : `Office #: ${NOT_AVAILABLE}`}
					</Typography>
				</div>

				{/* achievments */}
				<div className="flex flex-center">
					<FolderSpecialIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.achievements ? `Achievements: ${settings.achievements}` : `Achievements: ${NOT_AVAILABLE}`}
					</Typography>
				</div>
			</div>
		);
	}

	render() {
		const { classes, user } = this.props;
		const { value } = this.state;
		const settings = user.settings;
		return (
			<div>
				<div className={classes.root}>
					<AppBar position="static" color="inherit" elevation={0}>
						<Tabs
							value={value}
							onChange={this.handleChange}
							centered
							variant="fullWidth">
							<Tab label="General" />
							<Tab label="Schedule" />
							<Tab label="Plan an Appointment" />
							<Tab label="Prescriptions" />
						</Tabs>
					</AppBar>
					{value === 0 && (
						<TabContainer>
							{this.generalInfo(settings, classes)}
						</TabContainer>
					)}
					{value === 1 && (
						<TabContainer>
							{user.settings.schedule ? (
								<DoctorSchedule
									timeTable={user.settings.schedule}
								/>
							) : (
								<Typography variant="h4" align="center">
									Sorry, schedule not available. Our doctor
									forget to set it(
								</Typography>
							)}
						</TabContainer>
					)}
					{value === 2 && (
						<TabContainer>
							<SetMeeting user={user} />
						</TabContainer>
					)}
					{value === 3 && (
						<TabContainer>
							<SortedRecepies user={user} />
						</TabContainer>
					)}
				</div>
			</div>
		);
	}
}

DoctorProfileTabs.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DoctorProfileTabs);
