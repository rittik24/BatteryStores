import * as types from "./actiontype";
const initialState = {
  loading: false,
  error: false,
  battery: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_BATTERY: {
      return { ...state, battery: payload, loading: false };
    }
    default:
      return state;
  }
};
export default reducer;
