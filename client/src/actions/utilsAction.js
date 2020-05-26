
import {GET_PATIENTS_LIST, GET_DOCTORS_LIST, DOCTORS_LOADING, PATIENTS_LOADING, FIND_TOKEN,  CLEAR_FINDED_DOCTOR, GET_PATIENT_RECEPIE, GET_STATS } from "./constants";

// Get doctors list for patient
export const getDoctorsList = patientId => dispatch => {
    dispatch({ type: DOCTORS_LOADING });
    axios
        .get(`/api/patients/${patientId}`)
        .then(res => {
            dispatch({ type: GET_DOCTORS_LIST, data: res.data });
        })
        .catch(err => console.log(err));
};

//get patient list for doctors
export const getPatientList = doctorId => dispatch => {
  dispatch({ type: PATIENTS_LOADING });
  axios
      .get(`/api/doctors/${doctorId}`)
      .then(res => {
          dispatch({ type: GET_PATIENTS_LIST, data: res.data });
      })
      .catch(err => console.log(err));
};

//get token for patient that is linked to specific doctor
export const findToken = token => dispatch => {
  dispatch({ type: FIND_TOKEN });
  axios
      .post("/api/patients/adddoctor", {token})
      .then(res => {
          dispatch({ type: FIND_TOKEN , data: res.data });
      })
      .catch(err => console.log(err));
};

//Clears the token
export const clearFinded = () => dispatch => {
  dispatch({ type: CLEAR_FINDED_DOCTOR });
};

//Gets the personalized recipes for each patient
export const getPatientRecepies = (patientId) => dispatch => {
  dispatch({ type: GET_PATIENT_RECEPIE })
  axios
      .get(`/api/patients/recepies/${patientId}`)
      .then(res => {
          dispatch({ type: GET_PATIENT_RECEPIE , data: res.data });
      })
      .catch(err => console.log(err));

};

	