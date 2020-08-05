import url from 'url';
import { fromJS } from 'immutable';

import * as constants from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
  error: null,
  isAuthenticated: false,
  isAuthenticating: false,
  issuer: null,
  token: null,
  decodedToken: null,
  user: null
};

export const depnotes = createReducer(fromJS(initialState), {
  [constants.FETCH_DEPNOTES]: (state, action) =>
    state.merge({
      data: action.payload.data
    })
});
