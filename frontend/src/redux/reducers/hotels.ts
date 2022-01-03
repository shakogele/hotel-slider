import { SET_HOTELS } from "../actions/actionTypes";
import { HotelInterface } from '../../ts/hotel';

interface HotelState {
	list: HotelInterface[] | [];
}

interface ActionType {
	type: string,
	payload: HotelInterface | []
}

const initialState: HotelState = {
	list: [],
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_HOTELS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;