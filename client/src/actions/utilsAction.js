
import {
        GET_PATIENTS_LIST, GET_DOCTORS_LIST, 
        DOCTORS_LOADING, PATIENTS_LOADING, 
        FIND_TOKEN,  CLEAR_FINDED_DOCTOR, 
        GET_PATIENT_RECEPIE, GET_STATS,
        GET_USER_DATA 
       } 
from "./constants";

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
export const getPatientsList = doctorId => dispatch => {
  dispatch({ type: PATIENTS_LOADING });
  axios
      .get(`/api/doctors/${doctorId}`)
      .then(res => {
          dispatch({ type: GET_PATIENTS_LIST, data: res.data });
      })
      .catch(err => console.log(err));
};

//get generated token for patient that is linked to specific doctor
export const findToken = token => dispatch => {
  dispatch({ type: FIND_TOKEN });
  axios
      .post("/api/patients/adddoctor", {token})
      .then(res => {
          dispatch({ type: FIND_TOKEN , data: res.data });
      })
      .catch(err => console.log(err));
};

//Clears the token in search dialog box
export const clearFinded = () => dispatch => {
  dispatch({ type: CLEAR_FINDED_DOCTOR });
};

//Gets the personalized recipes for each patient
export const getPatientRecepies = patientId => dispatch => {
  dispatch({ type: PATIENTS_LOADING })
  axios
      .get(`/api/patients/recepies/${patientId}`)
      .then(res => {
          dispatch({ type: GET_PATIENT_RECEPIE , data: res.data });
      })
      .catch(err => console.log(err));

};

// Get stats data for charts
export const getStats = doctorID => dispatch => {
	axios
		.get(`/api/doctors/stats/${doctorID}`)
		.then(res => {
			dispatch({ type: GET_STATS, data: res.data });
		})
		.catch(err => console.log(err));
};

//will get user data to generate the user profile
export const getUserData = id => dispatch => {
	axios
		.get(`/api/user/get/:${id}`)
		.then(res => dispatch({ type: GET_USER_DATA, data: res.data }))
		.catch(err => console.log(err));
};

// Set generated token for doctor
export const setToken = (token, id) => dispatch => {
	axios
		.post("/api/doctors/tokens", { token, id })
		.then(res => res.json())
		.catch(err => console.log(err));
};

// Helper
export const setPatientsLoading = () => {
	return {
		type: PATIENTS_LOADING
	};
};

// Helper
export const setDoctorsLoading = () => {
	return {
		type: DOCTORS_LOADING
	};
};

// If token finded, merge patient and doctor
export const merge = (doctor, patient) => dispatch => {
	axios
		.post("/api/patients/merge", { doctor, patient })
		.then(res => console.log(res.data))
		.catch(err => console.log(err));
};

	