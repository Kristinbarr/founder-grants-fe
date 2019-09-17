// Action types
import { FETCH_START, FETCH_SUCCESS, FETCH_ERROR } from "../actions/types";

// Initial state

const initialState = {
  data: [],
  grantShowcase: []
};

// Reducer

export const rooterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_START:
      return {
        ...state,
        error: "",
        isFetching: true
      };
    case FETCH_SUCCESS:
      console.log("FETCH_SUCCESS payload", payload);
      return {
        ...state,
        error: "",
        isFetching: false,
        data: payload.grants
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    default:
      return state;
  }
};
