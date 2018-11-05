import axios from "axios";
import { FETCH_USER, FETCH_CAMPAIGNS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitCampaign = (values, history) => async dispatch => {
  const res = await axios.post("/api/campaigns", values);

  history.push("/campaigns");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCampaigns = () => async dispatch => {
  const res = await axios.get("/api/campaigns");

  dispatch({ type: FETCH_CAMPAIGNS, payload: res.data });
};
