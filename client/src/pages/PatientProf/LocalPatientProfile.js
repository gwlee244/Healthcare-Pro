/*
  Component that shows when you click on my profile in menu, as patient
  @imported in ProfileActions
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import EventIcon from "@material-ui/icons/Event";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import FaceIcon from "@material-ui/icons/Face";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// Helpers
import getAvatarInitials from "../../helpers/getAvatarInitials";
import { colors } from "../../helpers/palette";

const NOT_AVAILABLE = "N/A";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "80%",
    margin: "auto",
    flexGrow: 1,
    backgroundColor: "#00416A",
    justifyContent: 'center',
    textAlign: "center",
  },
  purpleAvatar: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    margin: "0 auto",
    color: "#fff",
    width: "80px",
		fontSize: "24px",
		height: "80px",
    position: "absolute",
    marginTop: "1%",
    marginBottom: "1%",
    left:"10",
    fontFamily: `'Ultra', serif`,
  },
  secondPaper: {
    width: "80%",
    margin: "auto"
  },
  infoItems: {
    marginLeft: ".5em",
    fontSize: "1.3em",
    color: "black"
  },
  name: {
    margin: "0 auto",
    paddingTop: "3%",
    paddingBottom: "3%",
    fontWeight: "bolder",
    display: "inline-block",
    color: "white"
  },
  emailLink: {
    color: "black"
  }
});
class LocalPatientProfile extends Component {

  generalInfo(user, classes) {
//if the user hasn't created a profile, then redirect them to the profile creater
    if (!user.settings) {
      return <Redirect to='/patient/home/settings' />
    }
    //if they have a profile, then format birthday in a pleasant way and render all their information
    else {
      const splitBDay = user.settings.birthday.split("-");
      const birthday = splitBDay[1] + '/' + splitBDay[2] + '/' + splitBDay[0];

      return (
        <div className="localProfileGrid">
          <div className="flex flex-center">
            <HomeIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {user.settings.address.street ? `Address: ${user.settings.address.number} ${
                user.settings.address.street
                }, ${user.settings.address.city}` : `Address: ${NOT_AVAILABLE}`}
            </Typography>
          </div>
          <div className="flex flex-center">
            <PhoneIcon color="primary" fontSize="large" />

            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {user.settings.phone ? <a className={classes.emailLink} href={`tel:${user.settings.phone}`}>Phone: {user.settings.phone}</a> : `Phone: ${NOT_AVAILABLE}`}

            </Typography>
          </div>
          <div className="flex flex-center">
            <EventIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
               {user.settings.birthday ? `Date of Birth: ${birthday}` : `Date of Birth: ${NOT_AVAILABLE}`}
                </Typography>
          </div>
          <div className="flex flex-center">
            <FaceIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
                {`Gender: ${
                user.settings.sex
                || NOT_AVAILABLE} `}</Typography>
          </div>
          <div className="flex flex-center">
            <MailIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {user.settings.email ? <a className={classes.emailLink} href={`mailto:${user.settings.email}`}>Email: {user.settings.email}</a> : `Email: ${NOT_AVAILABLE}`}

            </Typography>

          </div>
          <div className="flex flex-center">
            <WorkIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">{user.settings.work ? `Occupation: ${
                user.settings.work}` : `Occupation: N/A`
                }</Typography>
          </div>
          <div className="flex flex-center">
            <ChildFriendlyIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
                {`Marital Status: ${
                user.settings.maritalStatus || "Marital Status: N/A"
                }`}</Typography>
          </div>
          <div className="flex flex-center">
            <AccessibilityIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
                {user.settings.heightFeet && user.settings.heightInches ? `Height: ${user.settings.heightFeet} ft ${user.settings.heightInches} in / Weight: ${
                user.settings.weight || NOT_AVAILABLE
                } lbs` : `Height/Weight: N/A`}</Typography>
          </div>
          <div className="flex flex-center">
            <FavoriteIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">{`Blood Type: ${user.settings.blood.type} ${
                user.settings.blood.rhesus
                }`}</Typography>
          </div>
          <ExpansionPanel className="emergencyPanel">
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                className={classes.infoItems}
                variant="subtitle1">
                In case of emergency!
						</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography variant="subtitle1">
                    {user.settings.emergency.phoneNumber ? `Contact ${user.settings.emergency.fName} ${
								user.settings.emergency.lName
							}, ${user.firstName} ${user.lastName}'s ${
								user.settings.emergency.relation
							}, by calling ${
								user.settings.emergency.phoneNumber
							}` : `No Emergency Contact Provided`}   
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );
                }
    }
    
    render() {
      const { classes, user } = this.props;
      let initials = getAvatarInitials(user.firstName, user.lastName).join(
        ""
      );
      return (
        <div className = "whole-profile">
          <Paper className="profile-root" elevation={1}>
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
            </div>
          </Paper>
          <Paper className="profile-info" elevation={2}>
            {this.generalInfo(user, classes)}
          </Paper>
        </div>
      );

    }
  }
  LocalPatientProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };
  export default withStyles(styles)(LocalPatientProfile);