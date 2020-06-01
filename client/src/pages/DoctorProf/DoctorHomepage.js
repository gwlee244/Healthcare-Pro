import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
//loading components
import ProfileActions from "../../components/app-bar/ProfileActions";
import DoctorTabs from "./DoctorTabs"; //create DoctorTabs


export class DoctorHomepage extends Component {
  render() {
    return (
      <div>
        <ProfileActions userRole="Doctor" />
        <DoctorTabs />
      </div>
    )
  }
}

export default withRouter(DoctorHomepage);
