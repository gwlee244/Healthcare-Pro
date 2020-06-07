import { APPOINTMENT_ADD, GET_APPOINTMENTS } from "./constants";
import axios from "axios";

// Get doctor appointments
export const getDoctorAppointments = doctorID => dispatch => {
	axios
		.get(`/api/doctors/appointments/${doctorID}`)
		.then(res => {
			dispatch({ type: GET_APPOINTMENTS, data: res.data });
		})
		.catch(err => console.log(err));
};

// Get patient appointments
export const getPatientAppointments = patientID => dispatch => {
	axios
		.get(`/api/patients/appointments/${patientID}`)
		.then(res => {
			dispatch({ type: GET_APPOINTMENTS, data: res.data });
		})
		.catch(err => console.log(err));
};

// Add appointment to db
export const appointmentAdd = (
	appointment,
	doctorID,
	patientID
) => dispatch => {
	axios
		.post("/api/doctors/appointments/add", {
			doctorID,
			patientID,
			appointment
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));
	dispatch({ type: APPOINTMENT_ADD, data: appointment});
};
