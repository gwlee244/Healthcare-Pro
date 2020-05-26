
//fixed
import 
     { 
        GET_PATIENTS_LIST, GET_DOCTORS_LIST,
        DOCTORS_LOADING, PATIENTS_LOADING, FIND_TOKEN,
        CLEAR_FINDED_DOCTOR, GET_PATIENT_RECEPIE , GET_PATIENT_RECORD
     } 
from "../actions/constants";

const initialState = {
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {

    case FIND_TOKEN:
      return {
        ...state,
        findedDoctor: action.data,
        loading: false
      }

    case CLEAR_FINDED_DOCTOR:
      return {
        ...state,
        findedDoctor: "",
        loading: false
        
      }

    case GET_PATIENT_RECEPIE:
      return {
        ...state,
        loading: false,
        patientRecepie: action.data
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
      case GET_PATIENT_RECORD:
		return {
		...state,
		loading: false,
		patientRecords: action.data
	  };

    default:
      return state;
  }
}

