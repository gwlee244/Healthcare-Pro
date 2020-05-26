/*
    Component that shows when you click on my profile in menu, as patient
	@imported in ProfileActions
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import getAvatarInitials from "../../helpers/getAvatarInitials";
import { colors } from "../../helpers/palette";
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
import DoctorProfileTabs from "./DoctorProfileTabs";
const NOT_AVAILABLE = "N/A";
const styles = theme => ({
	root: {
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: "80%",
		margin: "auto"
	},
	avatar: {
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		width: 150,
		fontSize: "50px",
		height: 150
	},
	secondPaper: {
		width: "80%",
		margin: "1em auto"
	}
});
class LocalDoctorProfile extends Component {
    generalInfo(settings, classes) {
		return (
			<div className="localProfileGrid">
				{/* university */}
				<div className="flex flex-center universityInfo">
					<SchoolIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.university
							? `Studied at ${settings.university.univName},in ${
									settings.university.univCity
							  } city, for ${
									settings.university.univSpecialty
							  }, years of study ${
									settings.university.yearOfEntry
							  } - ${settings.university.yearOfOut}`
							: NOT_AVAILABLE}
					</Typography>
				</div>
				{/* specialty */}
				<div className="flex flex-center">
					<HealingIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{`${settings.specialty || NOT_AVAILABLE}`}
					</Typography>
				</div>
				{/* clinic name */}
				<div className="flex flex-center">
					<LocalHospitalIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{`${settings.clinicName || NOT_AVAILABLE}`}
					</Typography>
				</div>
				{/* clinic address */}
				<div className="flex flex-center">
					<PlaceIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{settings.address
							? `${settings.address.city}, ${
									settings.address.street
							  } ${settings.address.number}`
							: NOT_AVAILABLE}
					</Typography>
				</div>
				{/* work phone */}
				<div className="flex flex-center">
					<PhoneIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{`${settings.workPhone || NOT_AVAILABLE}`}
					</Typography>
				</div>
				{/* birthday */}
				<div className="flex flex-center">
					<EventIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{`${settings.birthday || NOT_AVAILABLE}`}
					</Typography>
				</div>
				{/* sex */}
				<div className="flex flex-center">
					<FaceIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{`${settings.sex || NOT_AVAILABLE}`}
					</Typography>
				</div>
				{/* years of practice */}
				<div className="flex flex-center">
					<StarIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{`${settings.yearsOfPractice || NOT_AVAILABLE}`}
					</Typography>
				</div>
				{/* cabinet */}
				<div className="flex flex-center">
					<CabinetIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{`Cabinet #${settings.cabinet || NOT_AVAILABLE}`}
					</Typography>
				</div>
				{/* achievments */}
				<div className="flex flex-center">
					<FolderSpecialIcon color="primary" fontSize="large" />
					<Typography
						className={classes.infoItems}
						variant="subtitle1">
						{`${settings.achievments || NOT_AVAILABLE}`}
					</Typography>
				</div>
			</div>
		);
    }
	render() {
		const { classes, user } = this.props;
		let initials = getAvatarInitials(user.firstName, user.lastName).join(
			""
		);
		return (
			<div>
				<Paper className={classes.root} elevation={1}>
					<div className="flex flex-center">
						<Avatar
							style={{
								backgroundColor: `${colors[user.color].bgc}`
							}}
							className={`${classes.avatar}`}>
							{initials}
						</Avatar>
						<Typography variant="h3">{`Dr. ${user.firstName} ${
							user.lastName
						}`}</Typography>
					</div>
				</Paper>
				<Paper className={classes.secondPaper} elevation={2}>
                {this.generalInfo(user, classes)}
				</Paper>
			</div>
		);
	}
}
LocalDoctorProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
export default withStyles(styles)(LocalDoctorProfile);