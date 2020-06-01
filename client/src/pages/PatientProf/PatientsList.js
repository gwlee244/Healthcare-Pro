import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPatientsList } from "../../actions/utilsAction";

//importing our components
import ThinProfile from "./ThinProfile";
import Loader from "../../utils/Loader";
class PatientsTab extends Component {
  componentDidMount() {
    this.props.getPatientsList(this.props.auth.user.id)
  }
  render() {

    let content = null;
    let { patientData } = this.props.general;
    if (patientData == null) {
      content = <Loader />
    }
    else {
      content = patientData.map((element, index) => {
        return <ThinProfile key={index} user={element} />
      });
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

export default connect(mapStateToProps, { getPatientsList })(PatientsTab);