import { SET_PATIENT, SET_DOCTOR, LOGOUT, GET_ERRORS } from "./constants";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../helpers/setAuthToken";

// Register doctor
export const registerDoctor = (userdata, history) => dispatch => {
 
  localStorage.setItem("doctorId", userdata._id );
	axios
		.post("/api/doctors/register", {
			userdata
		})
		.then(res => {
      localStorage.setItem("doctorId", res.data._id );

			history.push("/login");
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				data: err.response.data
			})
		);
};

// Register patient
export const registerPatient = (userdata, history) => dispatch => {
  localStorage.setItem("patientId", userdata._id );
	axios
		.post("/api/patients/register", {
			userdata
		})
		.then(res => {
			history.push("/login");
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				data: err.response.data
			})
		);
};

// Login user
export const loginUser = userdata => dispatch => {
  
	axios
		.post("/api/user/login", {
			userdata
		})
		.then(res => {
			if (res.data.token) {
				const { token } = res.data;
				localStorage.setItem("jwtToken", token);
				setAuthToken(token);
				const decoded = jwtDecode(token);
				dispatch(setCurrentUser(decoded));
			}
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				data: err.response.data
			});
		});
};

// Logout user
export const logout = () => dispatch => {
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};

// Set current user authenticated
export const setCurrentUser = decoded => {
	switch (decoded.typeOfUser) {
		case "Doctor":
			return {
				type: SET_DOCTOR,
				data: decoded
			};
		case "Patient":
			return {
				type: SET_PATIENT,
				data: decoded
			};
		default:
			return {
				type: LOGOUT,
				data: {}
			};
	}
};
