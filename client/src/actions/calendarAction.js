import  { GET_APPOINTMENTS, APPOINTMENT_ADD } from "./constants";
import axios from "axios";

export const getPatientAppointments = patientID => dispatch => {
    dispatch({ type: GET_APPOINTMENTS });
    axios
        .get(`/api/patients/appointments/${patientID}`)
        .then(res => {
            dispatch({ type: GET_APPOINTMENTS, data: res.data });
        })
        .catch(err => console.log(err));
};

export const getDoctorAppointments = doctorID => dispatch => {
    dispatch({ type: GET_APPOINTMENTS });
    axios
        .get(`/api/doctors/appointments/${doctorID}`)
        .then(res => {
            dispatch({ type: GET_APPOINTMENTS, data: res.data });
        })
        .catch(err => console.log(err));
};

export const appointmentAdd = (doctorID, patientID, appointment, day) => dispatch => {
    axios
        .post("/api/doctors/appointments/add", {doctorID, patientID, appointment, day})
        .then(res => console.log(res))
        .catch(err => console.log(err))
        dispatch({ type: APPOINTMENT_ADD, data: appointment, day });
}