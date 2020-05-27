import  { GET_APPOINTMENTS, APPOINTMENT_ADD } from "../actions/constants";

const initialState = {
	monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_APPOINTMENTS:
			return action.data
    
		case APPOINTMENT_ADD:
            state[action.day].push(action.data.appointment)
            return {...state};

		default:
			return state;
	}
};