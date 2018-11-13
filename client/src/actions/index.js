import axios from "axios";
import { FETCH_USER, FETCH_CHALLENGES, FETCH_MOUNTAINS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitChallenge = (values, history) => async dispatch => {
  const res = await axios.post("/api/challenges", values);

  history.push("/challenges");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchChallenges = () => async dispatch => {
  const res = await axios.get("/api/challenges");

  dispatch({ type: FETCH_CHALLENGES, payload: res.data });
};

export const fetchMountains = () => async dispatch => {
  const res = await axios.get("/api/mountains");

  dispatch({ type: FETCH_MOUNTAINS, payload: res.data });
};
