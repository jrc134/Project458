import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import donations from './donations';
export const reducers = combineReducers({ posts, auth, donations });
