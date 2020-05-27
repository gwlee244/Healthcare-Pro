import  { SET_SETTINGS, GET_SETTINGS } from "../constants";
import axios from "axios";

export const updatePatientSettings = (user, settings) => dispatch => {
    axios
      .post("/api/patients/updateSettings", {settings, user})
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));
}

export const updateDoctorSettings = (user, settings) => dispatch => {
    axios
        .post("/api/doctors/updateSettings", {settings, user})
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));
}

export const getPatientSettings = patientID => dispatch => {
  axios
    .get(`/api/patients/getSettings/${patientID}`)
      .then(res => {
          dispatch({type: GET_SETTINGS, data: res.data})
      })
      .catch(err => console.log(err));
}

export const getDoctorSettings = doctorID => dispatch => {
  axios
    .get(`/api/patients/getSettings/${doctorID}`)
      .then(res => {
          dispatch({type: GET_SETTINGS, data: res.data})
      })
      .catch(err => console.log(err));
}
