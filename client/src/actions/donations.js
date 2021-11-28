import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getDonations = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDonations();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createDonation = (donation) => async (dispatch) => {
  try {
    const { data } = await api.createDonation(donation);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateDonation = (id, donation) => async (dispatch) => {
  try {
    const { data } = await api.updateDonation(id, donation);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeDonation = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeDonation(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDonation = (id) => async (dispatch) => {
  try {
    await api.deleteDonation(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
