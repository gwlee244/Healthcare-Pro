import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPatientsList } from "../../actions/utilsAction";

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

PatientsTab.PropTypes = {
  auth: PropTypes.object.isRequired,
  general: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  general: state.general
})

export default connect(mapStateToProps, { getPatientsList })(PatientsTab);