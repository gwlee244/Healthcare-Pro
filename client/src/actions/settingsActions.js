import  { GET_SETTINGS } from "./constants";
import axios from "axios";

//update patient settings
export const updatePatientSettings = (settings, user) => dispatch => {
    axios
      .post("/api/patients/updateSettings", {
        settings, 
        user
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
};

//update doctor settings
export const updateDoctorSettings = (user, settings) => dispatch => {
    axios
        .post("/api/doctors/updateSettings", {settings, user})
        .then(res =>  console.log(res))
        .catch(err => console.log(err));
};

// will get the patient settings
export const getPatientSettings = patientID => dispatch => {
  axios
    .get(`/api/patients/getSettings/${patientID}`)
      .then(res => 
          dispatch({type: GET_SETTINGS, data: res.data})
      )
      .catch(err => console.log(err));
};

// will get the doctor settings
export const getDoctorSettings = doctorID => dispatch => {
  axios
    .get(`/api/patients/getSettings/${doctorID}`)
      .then(res => 
          dispatch({type: GET_SETTINGS, data: res.data})
      )
      .catch(err => console.log(err));
};
