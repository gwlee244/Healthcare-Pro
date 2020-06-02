import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
//loading components
import ProfileActions from "../../components/app-bar/ProfileActions";
import PatientTabs from "./PatientTabs"; //create PatientTabs


export class PatientHomepage extends Component {
  render() {
    return (
      <div>
        <ProfileActions userRole="Patient" />
        <PatientTabs />
      </div>
    )
  }
}

export default withRouter(PatientHomepage);