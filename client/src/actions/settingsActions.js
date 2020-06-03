import axios from "axios";
import { GET_SETTINGS } from "./constants";

// Update patient settings
export const updatePatientSettings = (settings, user) => dispatch => {
	axios
		.post("/api/patients/updateSettings", {
			settings,
			user
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

// Update doctor settings
export const updateDoctorSettings = (settings, user) => dispatch => {
	axios
		.post("/api/doctors/updateSettings", { settings, user })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

// Get patient settings
export const getPatientSettings = patientID => dispatch => {
	axios
		.get(`/api/patients/getSettings/${patientID}`)
		.then(res =>
			dispatch({
				type: GET_SETTINGS,
				data: res.data
			})
		)
		.catch(err => console.log(err));
};

// Get doctor settings
export const getDoctorSettings = doctorID => dispatch => {
	axios
		.get(`/api/doctors/getSettings/${doctorID}`)
		.then(res =>
			dispatch({
				type: GET_SETTINGS,
				data: res.data
			})
		)
		.catch(err => console.log(err));
};
