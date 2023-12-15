import axios from "axios";
import * as types from "./actiontype";

// get battery
export const getData = () => async (dispatch) => {
  try {
    let result = await axios.get(
      `https://rich-tick-cloak.cyclic.app/battery`
    );
    dispatch({ type: types.GET_BATTERYS, payload: result.data });
    console.log(result.data);
    return result.data;
  } catch (error) {
    dispatch({ type: types.GET_BATTERY_ERROR, payload: error.message });
  }
};
