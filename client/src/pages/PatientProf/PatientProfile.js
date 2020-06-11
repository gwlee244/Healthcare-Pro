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
    margin: "auto",
    backgroundColor: "#00416A",
    justifyContent: 'center',
    textAlign: "center",
    // border: "5px solid #00416A"
	},
	purpleAvatar: {
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		color: "#fff",
		width: "80px",
		fontSize: "24px",
		height: "80px",
    backgroundColor: deepPurple[500],
    position: "absolute",
    marginTop: "1.7%",
    marginBottom: "1.7%",
    left:"10",
    fontFamily: `'Ultra', serif`,
  
  },
  name: {
    margin: "0 auto",
    paddingTop: "3%",
    paddingBottom: "3%",
    fontWeight: "bolder",
    color: "white"
  },
	secondPaper: {
		width: "80%",
		margin: "auto"
  }, 
  allergies: {
    color: "orange",
    fontSize: 22,
    margin: 0,
   PaddingBottom: "20px"
  }
});

class PatientProfile extends Component {
  
	render() {
    const { classes, user } = this.props;
    console.log(user);
		let initials = getAvatarInitials(user.firstName, user.lastName).join(
			""
		);
		return (
			<div className = "whole-profile">
				<Paper className="profile-root" elevation={3}>
					<div className="">
						<Avatar
							style={{
								backgroundColor: `${colors[user.color].bgc}`
							}}
							className="profile-avatar">
							{initials}
						</Avatar>
						<Typography className="profile-name" variant="h3">{`${user.firstName} ${
							user.lastName
						}`}</Typography>
            <p className={classes.allergies}>** General Allergies: {user.settings.allergies ? user.settings.allergies : `N/A`} **</p>
            <p className={classes.allergies}>** Medical Allergies: {user.settings.medAllergies ? user.settings.medAllergies : `N/A`} **</p>
					</div>
				</Paper>
				<Paper className="profile-info" elevation={2}>
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
