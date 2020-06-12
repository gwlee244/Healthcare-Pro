//in the doctor portal this shows you your specific patients
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPatientsList } from "../../actions/utilsAction";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

//importing our components
import noPatient from "../../img/noPatient.jpg";
import ThinProfile from "./ThinProfile";
import Loader from "../../utils/Loader";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  topText: {
    textAlign: "center",
    padding: "3%",
    position: "absolute"

  },
  img: {
    width: "100%"
  }
});
class PatientsTab extends Component {
 
  componentDidMount() {
    this.props.getPatientsList(this.props.auth.user.id);
  }
  
  render() {

    const { classes } = this.props;

    let content = "";
    let { patientData } = this.props.general;
    if (patientData == null) {
      content = <Loader />
    }
    //If there is doctor data, map and render that data inside the thinprofile component
    else if(patientData.length){
     
        return <ThinProfile />
      
  }
  //If there is no data, send a warning to user
    else {
      content = <Paper>
      <h2 className={classes.topText}>You don't have any patients yet.  Try clicking on the circular icon in the top-right corner of the screen and select 'Generate Token'. Give this token to a patient and you can see their information here.</h2>
      <img className={classes.img} src={noPatient} alt="lego stormtroopers carrying a stretcher" /> 
    </Paper>
    }
return <div>{content}</div>
  }
}

PatientsTab.propTypes = {
  auth: PropTypes.object.isRequired,
  general: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  general: state.general
})

export default connect(mapStateToProps, { getPatientsList })(withStyles(styles)(PatientsTab));