import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./helpers/setAuthToken";
import jwt_decode from "jwt-decode";
// Components
import Home from "../src/pages/Auth/Home";
import Login from "../src/pages/Auth/Login";
import Register from "../src/pages/Auth/Register";

import PrivateDoctorRoute from "./utils/PrivateDoctorRoute";
import PrivatePatientRoute from "./utils/PrivatePatientRoute";

import Main from './pages/patient/Main';
import Appointment from "./pages/patient/Appointment";
import Message from "./pages/patient/Message";
import Results from "./pages/patient/Results";
import Summary from "./pages/patient/Summary";
import Doctors from "./pages/patient/Doctors";
import DoctorMain from './pages/doctor/DoctorMain';
import Connect from './pages/doctor/Connect';
import Patients from './pages/doctor/Patients';
import Schedule from './pages/doctor/Schedule';
import Profile from './pages/doctor/Profile';
// Actions
import { setCurrentUser } from "./actions/authorizationAction";

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
        
				<Router>
					<div className="App">
						<Route exact path="/" component={Home} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Switch>
							<PrivatePatientRoute exact path="/patient/home" component={Main} />
              <PrivatePatientRoute exact path="/patient/appointment" component={Appointment} />
              <PrivatePatientRoute exact path="/patient/message" component={Message} />
              <PrivatePatientRoute exact path="/patient/results" component={Results} />
              <PrivatePatientRoute exact path="/patient/doctors" component={Doctors} />
              <PrivatePatientRoute exact path="/patient/summary" component={Summary} />
      

							<PrivateDoctorRoute exact path="/doctor/home" component={DoctorMain}/>
              <PrivateDoctorRoute exact path="/doctor/connect" component={Connect}/>
              <PrivateDoctorRoute exact path="/doctor/patients" component={Patients}/>
              <PrivateDoctorRoute exact path="/doctor/schedule" component={Schedule}/>
              <PrivateDoctorRoute exact path="/doctor/profile" component={Profile}/>
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
