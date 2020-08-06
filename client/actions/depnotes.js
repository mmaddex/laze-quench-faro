import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';

import * as constants from '../constants';

export function loadDepNotes() {
  return (dispatch) => {
    //call the mgmt api to grap depnotes
    axios.request('/api/depnotes').then( (response) => {
      dispatch({
        type: constants.FETCH_DEPNOTES,
        payload: {
          data: response.data
        }
      });
    }
    )
  }
}
