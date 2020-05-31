import {GET_STATS} from "../actions/constants";

export default function (state = {}, action) {
  switch (action.type) {

    case GET_STATS:
      return {
        ...state,
        quantity: action.data.quantity,
        sexesPie: action.data.sexesPie,
        business: action.data.business,
        satisfaction: action.data.satisfaction,
        monthlyVisitors: action.data.monthlyVisitors,
        sexesBar: action.data.sexesBar
      }
      default:
			return state;
    }
  }
