
//fixed
import {GET_PATIENTS_LIST, GET_DOCTORS_LIST, DOCTORS_LOADING, PATIENTS_LOADING} from "../actions/constants";

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
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

// import {GET_PATIENTS_LIST, GET_DOCTORS_LIST, DOCTORS_LOADING, PATIENTS_LOADING} from "../actions/constants";

// const initialState = {
//   loading: false
// };

// export default function(state = initialState, action) {
// 	switch (action.type) {
// 		case GET_DOCTORS_LIST:
// 			return {
// 				...state,
// 				loading: false,
// 				doctorData: action.data
//       };

//       case DOCTORS_LOADING:
// 			return {
// 				...state,
// 				loading: true
//       };

//       case GET_PATIENTS_LIST:
//         return {
//           ...state,
//           loading: false,
//           patientData: action.data
//         };
  
//         case PATIENTS_LOADING:
//         return {
//           ...state,
//           loading: true
//         };
//   }
// }

