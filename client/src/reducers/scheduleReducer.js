import  { GET_APPOINTMENTS, APPOINTMENT_ADD } from "../actions/constants";

const initialState = {
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_APPOINTMENTS:
			return action.data
    
		case APPOINTMENT_ADD:
            return action.data;

		default:
			return state;
	}
};