
import {GET_PATIENTS_LIST, GET_DOCTORS_LIST, DOCTORS_LOADING, PATIENTS_LOADING} from "./constants";

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

export const getPatientList = doctorId => dispatch => {
  dispatch({ type: PATIENTS_LOADING });
  axios
      .get(`/api/doctors/${doctorId}`)
      .then(res => {
          dispatch({ type: GET_PATIENTS_LIST, data: res.data });
      })
      .catch(err => console.log(err));
};

	