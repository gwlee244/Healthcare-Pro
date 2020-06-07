/*
  Doctor settings. very complicated, i know
  @imported at App
*/
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/Icon";
import CloseIcon from "@material-ui/icons/Close";
// Components
import ProfileActions from "../../components/app-bar/ProfileActions";
// Actions
import {
  updateDoctorSettings,
  getDoctorSettings
} from "../../actions/settingsActions";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  paperConfig: {
    width: "60vw",
    height: "100%",
    margin: "2em auto",
    padding: "2em"
  },
  marginInput: {
    margin: "1% 1% 1% 0"
  },
  headerConfig: {
    marginBottom: "3vh",
    marginTop: "3vh"
  },
  btn: {
    margin: "3em 0 1em 1em",
    width: "10vw"
  },
  halfWidth: {
    width: "48%"
  },
  quarterWidth: {
    width: "23.5%"
  },
  selectField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  timeWidth: {
    width: "7vw"
  }
});

let scheduleObj = {
  monday: {
    fromMonday: "08:00",
    toMonday: "18:00"
  },
  tuesday: {
    fromTuesday: "08:00",
    toTuesday: "18:00"
  },
  wednesday: {
    fromWednesday: "08:00",
    toWednesday: "18:00"
  },
  thursday: {
    fromThursday: "08:00",
    toThursday: "18:00"
  },
  friday: {
    fromFriday: "08:00",
    toFriday: "18:00"
  }
};

class DoctorSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      openSnackBar: false,
      birthday: "",
      sex: "",
      workPhone: "",
      yearsOfPractice: "",
      achievements: "",
      clinicName: "",
      cabinet: "",
      specialty: "",
      address: {
        street: "",
        city: "",
        number: ""
      },
      university: {
        univCity: "",
        univName: "",
        yearOfEntry: "",
        yearOfOut: "",
        univSpecialty: ""
      },
      schedule: {
        monday: {
          fromMonday: "08:00",
          toMonday: "18:00"
        },
        tuesday: {
          fromTuesday: "08:00",
          toTuesday: "18:00"
        },
        wednesday: {
          fromWednesday: "08:00",
          toWednesday: "18:00"
        },
        thursday: {
          fromThursday: "08:00",
          toThursday: "18:00"
        },
        friday: {
          fromFriday: "08:00",
          toFriday: "18:00"
        }
      }
    };
    this.handleExpand = this.handleExpand.bind(this);
    this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
    this.onChangeSettings = this.onChangeSettings.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeUniversity = this.onChangeUniversity.bind(this);
    this.assignSchedule = this.assignSchedule.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.SetSchedule = this.SetSchedule.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleCloseSnackBar = () => {
    this.setState({ openSnackBar: false });
  };

  onChangeSettings = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  onChangeAddress = ev => {
    this.setState({
      address: Object.assign({}, this.state.address, {
        [ev.target.name]: ev.target.value
      })
    });
  };

  onChangeUniversity = ev => {
    this.setState({
      university: Object.assign({}, this.state.university, {
        [ev.target.name]: ev.target.value
      })
    });
  };

  assignSchedule(targetName, targetValue, day) {
    return Object.assign({}, this.state.schedule[day], {
      [targetName]: targetValue
    });
  }

  componentDidMount = () => {
    this.props.getDoctorSettings(this.props.auth.user.id);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings) {
      this.setState(Object.assign({}, nextProps.settings));
      this.scheduleObj = nextProps.settings.schedule;
    }
  }


  handleDateChange = ev => {
    let { name, value } = ev.target;
    let day = name.match(/[A-Z].+/g)[0].toLowerCase();
    switch (day) {
      case "monday":
        scheduleObj.monday = this.assignSchedule(name, value, day);
        break;
      case "tuesday":
        scheduleObj.tuesday = this.assignSchedule(name, value, day);
        break;
      case "wednesday":
        scheduleObj.wednesday = this.assignSchedule(name, value, day);
        break;
      case "thursday":
        scheduleObj.thursday = this.assignSchedule(name, value, day);
        break;
      case "friday":
        scheduleObj.friday = this.assignSchedule(name, value, day);
        break;
      default:
        throw new Error("Sorry something went wrong");
    }
    this.setState(this.state);
  };

  SetSchedule = () => {
    const { classes } = this.props;
    console.log(scheduleObj);
    return (
      <div className="grid-schedule">
        <Typography variant="h6">Monday</Typography>
        <Typography variant="body2">From: </Typography>
        <TextField
          id="time"
          value={scheduleObj.monday.fromMonday}
          inputProps={{
            step: 300
          }}
          className={classes.timeWidth}
          name="fromMonday"
          onChange={this.handleDateChange}
          type="time"
        />
        <Typography variant="body2">To: </Typography>
        <TextField
          id="time"
          value={scheduleObj.monday.toMonday}
          inputProps={{
            step: 300
          }}
          className={classes.timeWidth}
          name="toMonday"
          onChange={this.handleDateChange}
          type="time"
        />

        <Typography variant="h6">Tuesday</Typography>
        <Typography variant="body2">From: </Typography>
        <TextField
          id="time"
          value={scheduleObj.tuesday.fromTuesday}
          inputProps={{
            step: 300
          }}
          name="fromTuesday"
          onChange={this.handleDateChange}
          type="time"
        />
        <Typography variant="body2">To: </Typography>
        <TextField
          id="time"
          value={scheduleObj.tuesday.toTuesday}
          inputProps={{
            step: 300
          }}
          name="toTuesday"
          onChange={this.handleDateChange}
          type="time"
        />

        <Typography variant="h6">Wednesday</Typography>
        <Typography variant="body2">From: </Typography>
        <TextField
          id="time"
          value={scheduleObj.wednesday.fromWednesday}
          inputProps={{
            step: 300
          }}
          name="fromWednesday"
          onChange={this.handleDateChange}
          type="time"
        />
        <Typography variant="body2">To: </Typography>
        <TextField
          id="time"
          value={scheduleObj.wednesday.toWednesday}
          inputProps={{
            step: 300
          }}
          name="toWednesday"
          onChange={this.handleDateChange}
          type="time"
        />

        <Typography variant="h6">Thursday</Typography>
        <Typography variant="body2">From: </Typography>
        <TextField
          id="time"
          value={scheduleObj.thursday.fromThursday}
          inputProps={{
            step: 300
          }}
          name="fromThursday"
          onChange={this.handleDateChange}
          type="time"
        />
        <Typography variant="body2">To: </Typography>
        <TextField
          id="time"
          value={scheduleObj.thursday.toThursday}
          inputProps={{
            step: 300
          }}
          name="toThursday"
          onChange={this.handleDateChange}
          type="time"
        />

        <Typography variant="h6">Friday</Typography>
        <Typography variant="body2">From: </Typography>
        <TextField
          id="time"
          value={scheduleObj.friday.fromFriday}
          inputProps={{
            step: 300
          }}
          name="fromFriday"
          onChange={this.handleDateChange}
          type="time"
        />
        <Typography variant="body2">To: </Typography>
        <TextField
          id="time"
          value={scheduleObj.friday.toFriday}
          inputProps={{
            step: 300
          }}
          name="toFriday"
          onChange={this.handleDateChange}
          type="time"
        />
      </div>
    );
  };

  onSave = ev => {
  
    this.setState({ schedule: scheduleObj });
    this.props.updateDoctorSettings(this.state, this.props.auth.user.id);
    this.setState({ openSnackBar: true });
  };

render() {
  const { classes } = this.props;
  const { expanded } = this.state;

  return (
    <div className={classes.root}>

      <ProfileActions
        userRole="Doctor"
        back={true}
        toLocation="/doctor/home"
      />

      <Paper elevation={5} className={classes.paperConfig}>
        <Typography variant="h4" className={classes.headerConfig}>
          General Settings
					</Typography>

        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleExpand("panel1")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Date of Birth
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Input your birthday so we know your age
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              type="date"
              variant="outlined"
              // defaultValue="2000-01-01"
              value={this.state.birthday || "2000-01-01"}
              inputProps={{
                step: 300
              }}
              name="birthday"
              onChange={this.onChangeSettings}
              className={classes.dateField}
              label=""
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={this.handleExpand("panel2")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Gender
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Select your Gender
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="flex flex-center">
              <RadioGroup
                aria-label="Gender"
                name="sex"
                value={this.state.sex}
                onChange={this.onChangeSettings}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === "panel3"}
          onChange={this.handleExpand("panel3")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Education Info
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Enter your medical school information
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="flex flex-wrap">
            <TextField
              fullWidth
              name="univCity"
              onChange={this.onChangeUniversity}
              variant="outlined"
              value={this.state.university.univCity}
              label="Location of medical school"
              placeholder="UNC Chapel Hill NC, USA"
              className={`${classes.halfWidth} ${
                classes.marginInput
                }`}
            />
            <TextField
              fullWidth
              name="univName"
              onChange={this.onChangeUniversity}
              variant="outlined"
              value={this.state.university.univName}
              label="Name of medical school"
              placeholder="UNC Chapel Hill NC, USA"
              className={`${classes.halfWidth} ${
                classes.marginInput
                }`}
            />
            <TextField
              name="yearOfEntry"
              variant="outlined"
              type="number"
              value={this.state.university.yearOfEntry}
              label="Year of entry"
              onChange={this.onChangeUniversity}
              placeholder="2006"
              className={`${classes.marginInput} ${
                classes.quarterWidth
                }`}
            />
            <TextField
              name="yearOfOut"
              variant="outlined"
              type="number"
              value={this.state.university.yearOfOut}
              label="Graduation year"
              onChange={this.onChangeUniversity}
              placeholder="2012"
              className={`${classes.marginInput} ${
                classes.quarterWidth
                }`}
            />
            <TextField
              name="univSpecialty"
              variant="outlined"
              label="Your specialty"
              value={this.state.university.univSpecialty}
              onChange={this.onChangeUniversity}
              placeholder="surgery"
              className={`${classes.marginInput} ${
                classes.halfWidth
                }`}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === "panel4"}
          onChange={this.handleExpand("panel4")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Years of practice
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Years practicing medicine
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Select
              value={this.state.yearsOfPractice}
              name="yearsOfPractice"
              onChange={this.onChangeSettings}
              variant="outlined"
              className={classes.selectField}>
              <MenuItem value={"0-3"}>0-3 years</MenuItem>
              <MenuItem value={"3-5"}>3-5 years</MenuItem>
              <MenuItem value={"5-10"}>5-10 years</MenuItem>
              <MenuItem value={"10-15"}>10-15 years</MenuItem>
              <MenuItem value={"15+"}>15+ years</MenuItem>
            </Select>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === "panel5"}
          onChange={this.handleExpand("panel5")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Work Phone Number
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Enter your office number
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="flex flex-center">
              <Typography variant="h6"></Typography>
              <TextField
                type="number"
                className={classes.dateField}
                label="Phone number"
                value={this.state.workPhone}
                name="workPhone"
                InputProps={{ inputProps: { max: 10 } }}
                onChange={this.onChangeSettings}
                placeholder="(XXX)-555-5555"
                variant="outlined"
              />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === "panel6"}
          onChange={this.handleExpand("panel6")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Special achievements
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Personal and Professional achievements
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              name="achievements"
              multiline
              fullWidth
              value={this.state.achievements}
              onChange={this.onChangeSettings}
              label="Your awards, diploma, certificates, etc"
              variant="outlined"
              placeholder="Separate with commas"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <Typography variant="h4" className={classes.headerConfig}>
          About your current work organization
					</Typography>

        <ExpansionPanel
          expanded={expanded === "panel7"}
          onChange={this.handleExpand("panel7")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Name
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Input the name of the place where you work
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              fullWidth
              name="clinicName"
              value={this.state.clinicName}
              onChange={this.onChangeSettings}
              label="Work name"
              variant="outlined"
              placeholder="UNC Family HealthCare"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === "panel8"}
          onChange={this.handleExpand("panel8")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Address
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Input the address of your clinic / office
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>


            <TextField
              type="text"
              fullWidth
              className={classes.marginInput}
              onChange={this.onChangeAddress}
              name="number"
              value={this.state.address.number}
              variant="outlined"
              label="Building number"
              placeholder="i.e. 46"
            />
            <TextField
              type="text"
              fullWidth
              className={classes.marginInput}
              onChange={this.onChangeAddress}
              name="street"
              variant="outlined"
              value={this.state.address.street}
              label="Street"
              placeholder="House#, st name, city, postal code"
            />

            <TextField
              type="text"
              fullWidth
              className={classes.marginInput}
              onChange={this.onChangeAddress}
              name="city"
              value={this.state.address.city}
              variant="outlined"
              label="City"
              placeholder="201, Manning Drive Chapel Hill"
            />

          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === "panel9"}
          onChange={this.handleExpand("panel9")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Office
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Room # within your workplace
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              name="cabinet"
              onChange={this.onChangeSettings}
              label="Number"
              value={this.state.cabinet}
              variant="outlined"
              placeholder="i.e. 234"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === "panel10"}
          onChange={this.handleExpand("panel10")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Specialty
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Input your current specialty
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              fullWidth
              name="specialty"
              value={this.state.specialty}
              onChange={this.onChangeSettings}
              label="Current specialty"
              variant="outlined"
              placeholder="i.e. Physician"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === "panel11"}
          onChange={this.handleExpand("panel11")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Schedule
							</Typography>
            <Typography className={classes.secondaryHeading}>
              Set your working schedule
							</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {this.SetSchedule()}
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <div className="flex flex-end">
          <Link to="/doctor/home/">
            <Button
              variant="outlined"
              hred="/doctor/home"
              color="secondary"
              className={classes.btn}>
              Go Back
						</Button>
          </Link>
          <Button
            variant="contained"
            onClick={this.onSave}
            color="secondary"
            className={classes.btn}>
            Save
						</Button>
        </div>
      </Paper>
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
        message={<span id="message-id">Saved</span>}
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

DoctorSettings.propTypes = {
  auth: PropTypes.object.isRequired,
  general: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  general: state.general,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { updateDoctorSettings, getDoctorSettings }
)(withStyles(styles)(DoctorSettings));
