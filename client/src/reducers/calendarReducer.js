import  { GET_APPOINTMENTS, APPOINTMENT_ADD } from "../actions/constants";

const initialState = {
	monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_APPOINTMENTS:
			return action.data 
    
		case APPOINTMENT_ADD:
            return action.data
            state[action.day].push(action.data.appointment)

		default:
			return state;
	}
}