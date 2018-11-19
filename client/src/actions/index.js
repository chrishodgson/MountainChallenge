import axios from "axios";
import {
  FETCH_USER,
  FETCH_CHALLENGES,
  SEARCH_MOUNTAINS,
  SELECT_MOUNTAINS
} from "./types";

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

export const searchMountains = (term, area = null) => async dispatch => {
  const res = await axios.get("/api/mountains", {
    params: { term: term, area: area }
  });

  dispatch({ type: SEARCH_MOUNTAINS, payload: res.data });
};

export const selectMountains = mountainId => {
  return { type: SELECT_MOUNTAINS, payload: mountainId };
};
