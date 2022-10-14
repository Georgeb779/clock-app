import { ACTION_TYPES } from "../actions";

type DispatchType = (args: {
  type: string;
  payload: { name: string; data: string } | { name: string };
}) => void;

export class ApisServices {
  constructor() {}

  async getUserPublicIp(dispatch: DispatchType) {
    dispatch({ type: ACTION_TYPES.FETCH_START, payload: { name: "ipNumber" } });
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return dispatch({
        type: ACTION_TYPES.FETCH_SUCCESS,
        payload: { name: "ipNumber", data: data.ip }
      });
    } catch (error) {
      return dispatch({
        type: ACTION_TYPES.FETCH_ERROR,
        payload: { name: "ipNumber" }
      });
    }
  }

  async getTime(ip: string, dispatch: DispatchType) {
    dispatch({ type: ACTION_TYPES.FETCH_START, payload: { name: "time" } });
    if (ip !== "" && ip !== undefined) {
      try {
        const response = await fetch(`http://worldtimeapi.org/api/ip/${ip}`);
        const data = await response.json();
        return dispatch({
          type: ACTION_TYPES.FETCH_SUCCESS,
          payload: { name: "time", data: data }
        });
      } catch (error) {
        return dispatch({
          type: ACTION_TYPES.FETCH_ERROR,
          payload: { name: "time" }
        });
      }
    }
  }

  async getLocationWithIp(ip: string, dispatch: DispatchType) {
    dispatch({
      type: ACTION_TYPES.FETCH_START,
      payload: { name: "locationInfo" }
    });
    try {
      if (ip) {
        const response = await fetch(`https://ip-api.com/json/${ip}`);
        const data = await response.json();
        return dispatch({
          type: ACTION_TYPES.FETCH_SUCCESS,
          payload: { name: "locationInfo", data: data }
        });
      }
    } catch (error) {
      return dispatch({
        type: ACTION_TYPES.FETCH_ERROR,
        payload: { name: "locationInfo" }
      });
    }
  }

  async getQuote(dispatch: DispatchType) {
    dispatch({ type: ACTION_TYPES.FETCH_START, payload: { name: "quote" } });
    try {
      const response = await fetch(
        "https://programming-quotes-api.herokuapp.com/Quotes/random"
      );
      const data = await response.json();
      return dispatch({
        type: ACTION_TYPES.FETCH_SUCCESS,
        payload: { name: "quote", data: data }
      });
    } catch (error) {
      return dispatch({
        type: ACTION_TYPES.FETCH_ERROR,
        payload: { name: "quote" }
      });
    }
  }
}
