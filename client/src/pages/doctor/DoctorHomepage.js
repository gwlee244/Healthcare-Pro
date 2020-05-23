/*
	Initial component that will hold all doctor realated
	functionlities
*/
import React, { Component } from "react";
import { withRouter } from "react-router-dom";


class DoctorDashboard extends Component {
	render() {
		return (
			<div>
				<hi>doctor</hi>
			</div>
		);
	}
}

export default withRouter(DoctorDashboard);
