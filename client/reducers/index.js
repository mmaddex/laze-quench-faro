import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { auth } from './auth';
import { depnotes } from './depnotes';

export default combineReducers({
  routing,
  auth,
  depnotes
});
