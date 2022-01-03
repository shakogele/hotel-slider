import { UI_START_LOADING, UI_STOP_LOADING } from "../actions/actionTypes";

interface UIState {
	isLoading: Boolean;
}

interface ActionType {
	type: string,
}

const initialState: UIState = {
  isLoading: false,
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;