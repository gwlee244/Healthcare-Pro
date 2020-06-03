/*
  Component that shows when you click on profile in My patients tab, as doctor
  @imported in ThinProfile
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";
// Helpers
import getAvatarInitials from "../../helpers/getAvatarInitials";
import { colors } from "../../helpers/palette";
// Components
import PatientProfileTabs from "./PatientProfileTabs";

const styles = theme => ({
	root: {
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: "80%",
		margin: "auto"
	},
	purpleAvatar: {
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		color: "#fff",
		width: 150,
		fontSize: "50px",
		height: 150,
		backgroundColor: deepPurple[500]
	},
	secondPaper: {
		width: "80%",
		margin: "1em auto"
	}
});

class PatientProfile extends Component {
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
							className={classes.purpleAvatar}>
							{initials}
						</Avatar>
						<Typography variant="h3">{`${user.firstName} ${
							user.lastName
						}`}</Typography>
					</div>
				</Paper>
				<Paper className={classes.secondPaper} elevation={2}>
					<PatientProfileTabs user={user} />
				</Paper>
			</div>
		);
	}
}

PatientProfile.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

export default withStyles(styles)(PatientProfile);
