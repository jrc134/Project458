import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (donations = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return donations.map((donation) => (donation._id === action.payload._id ? action.payload : donation));
    case CREATE:
      return [...donations, action.payload];
    case UPDATE:
      return donations.map((donation) => (donation._id === action.payload._id ? action.payload : donation));
    case DELETE:
      return donations.filter((donation) => donation._id !== action.payload);
    default:
      return donations;
  }
};