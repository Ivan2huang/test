import produce from 'immer';

import createReducer from '../../helpers/reducer';
import { UPDATE_CONTACT_INFO } from './action';

const initialState = {
  contactInfo: {},
};

const updateContactInfo = produce((state, action) => {
  return {
    ...state,
    contactInfo: action.payload.contactInfo,
  };
});

const reducer = createReducer(initialState, {
  [UPDATE_CONTACT_INFO]: updateContactInfo,
});

export default reducer;
