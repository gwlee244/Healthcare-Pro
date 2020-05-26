
//fixed
import { GET_PATIENTS_LIST, GET_DOCTORS_LIST, DOCTORS_LOADING, PATIENTS_LOADING, FIND_TOKEN, CLEAR_FINDED_DOCTOR, GET_PATIENT_RECEPIE } from "../actions/constants";

const initialState = {
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {

    case FIND_TOKEN:
      return {
        ...state,
        loading: false,
        findADoctor: action.data
      }

    case CLEAR_FINDED_DOCTOR:
      return {
        ...state,
        loading: false,
        findADoctor: ""
      }

    case GET_PATIENT_RECEPIE:
      return {
        ...state,
        loading: false,
        patientRecipe: action.data
      }

    case GET_DOCTORS_LIST:
      return {
        ...state,
        loading: false,
        doctorData: action.data
      };

    case DOCTORS_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PATIENTS_LIST:
      return {
        ...state,
        loading: false,
        patientData: action.data
      };

    case PATIENTS_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}

