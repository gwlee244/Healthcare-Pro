import  { SET_SETTINGS } from "../constants";
import axios from "axios";

export const createPatientSettings = (user, settings) => dispatch => {
    dispatch({type: SET_SETTINGS});
    axios
        .post(`/api/patients/updateSettings/`, {settings, user})
        .then(res => {
            console.log(res)
            dispatch({type: SET_SETTINGS, data: res.data})
        })
        .catch(err => console.log(err));
}

export const createDoctorSettings = (user, settings) => dispatch => {
    dispatch({type: SET_SETTINGS});
    axios
        .post(`/api/doctors/updateSettings/`, {settings, user})
        .then(res => {
            console.log(res)
            dispatch({type: SET_SETTINGS, data: res.data})
        })
        .catch(err => console.log(err));
}