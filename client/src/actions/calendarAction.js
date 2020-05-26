import  { GET_APPOINTMENTS, APPOINTMENT_ADD } from "./constants";
import axios from "axios";

export const getPatientAppointments = patientId => dispatch => {
    dispatch({ type: GET_APPOINTMENTS });
    axios
        .get(`/api/patients/appointments/${patientId}`)
        .then(res => {
            dispatch({ type: GET_APPOINTMENTS, data: res.data });
        })
        .catch(err => console.log(err));
};

export const getDoctorAppointments = doctorId => dispatch => {
    dispatch({ type: GET_APPOINTMENTS });
    axios
        .get(`/api/doctors/appointments/${doctorId}`)
        .then(res => {
            dispatch({ type: GET_APPOINTMENTS, data: res.data });
        })
        .catch(err => console.log(err));
};

export const addAppointment = (doctorID, patientID, appointment, day) => dispatch => {
    dispatch({ type: APPOINTMENT_ADD });
    axios
        .post("/api/doctors/appointments/add", {doctorID, patientID, appointment, day})
        .then(res => console.log(res))
        .catch(err => console.log(err))
        dispatch({ type: APPOINTMENT_ADD, data: res.data });
}