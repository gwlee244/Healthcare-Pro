/*
    Component that shows when you click on my profile in menu, as patient
	@imported in ProfileActions
*/
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
  },
  infoItems: {
    marginLeft: ".5em",
    fontSize: "1.3em",
  },
  phoneLink: {
    color: "black"
  }
});

class LocalDoctorProfile extends Component {
  constructor(props) {
		super(props);
		this.state = {
			apples: 0
    };
  }
  componentDidMount = () => {
    this.forceUpdate();
    this.setState({ apples: 1 });
    console.log(this.state.apples);
  }
  generalInfo(user, classes) {
    if (!user.settings) {
      return <Redirect to='/doctor/home/settings' />
    }
    else {
      console.log(this.state.apples);
      const splitBDay = user.settings.birthday.split("-");
      const birthday = splitBDay[1] + '/' + splitBDay[2] + '/' + splitBDay[0];

      return (
        <div className="localProfileGrid">
          {/* university */}
          <div className="flex flex-center universityInfo">
            <SchoolIcon color="primary" fontSize="large" />
            <Typography
						className={classes.infoItems}
						variant="subtitle1">
						{user.settings.university
							? `Studied at ${user.settings.university.univName}, in the city of ${
									user.settings.university.univCity
							  } for ${
									user.settings.university.univSpecialty
							  }. Years of study: (${
									user.settings.university.yearOfEntry
							  } - ${user.settings.university.yearOfOut})`
							: `Studied at: ${NOT_AVAILABLE}`}
					</Typography>
          </div>

          {/* specialty */}
          <div className="flex flex-center">
            <HealingIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {user.settings.specialty ? `Specialty: ${user.settings.specialty}` : `Specialty: ${NOT_AVAILABLE}`}
            </Typography>
          </div>

          {/* clinic name */}
          <div className="flex flex-center">
            <LocalHospitalIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {user.settings.clinicName ? `Clinic name: ${user.settings.clinicName}` : `Clinic name: ${NOT_AVAILABLE}`}
            </Typography>
          </div>

          {/* clinic address */}
          <div className="flex flex-center">
            <PlaceIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {user.settings.address.street
                ? `Address: ${user.settings.address.number} ${user.settings.address.street} ${user.settings.address.city}`
                : `Address: ${NOT_AVAILABLE}`}
            </Typography>
          </div>

          {/* work phone */}
          <div className="flex flex-center">
            <PhoneIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {user.settings.workPhone ? <a className={classes.phoneLink} href={`tel:${user.settings.workPhone}`}>Phone: {user.settings.workPhone}</a> : `Phone: ${NOT_AVAILABLE}`}

            </Typography>
          </div>

          {/* birthday */}
          <div className="flex flex-center">
            <EventIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
               {birthday ? `Date of Birth: ${birthday}` : `Date of Birth: ${NOT_AVAILABLE}`}
                </Typography>
          </div>

          {/* sex */}
          <div className="flex flex-center">
            <FaceIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {user.settings.sex ? `Gender: ${user.settings.sex}` : `Gender: ${NOT_AVAILABLE}`}

            </Typography>
          </div>

          {/* years of practice */}
          <div className="flex flex-center">
            <StarIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {user.settings.yearsOfPractice ? `Years of practice: ${user.settings.yearsOfPractice}` : `Years of practice: ${NOT_AVAILABLE}`}
            </Typography>
          </div>

          {/* cabinet */}
          <div className="flex flex-center">
            <CabinetIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {`Office #: ${user.settings.cabinet || NOT_AVAILABLE}`}
            </Typography>
          </div>

          {/* achievements */}
          <div className="flex flex-center">
            <FolderSpecialIcon color="primary" fontSize="large" />
            <Typography
              className={classes.infoItems}
              variant="subtitle1">
              {`Achievements: ${user.settings.achievements || NOT_AVAILABLE}`}
            </Typography>
          </div>

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
