/* eslint-disable no-param-reassign */
import produce from 'immer';
import createReducer from '../../../helpers/reducer';

import { UPDATE_COMPANY_CONTACT_DETAILS_AND_FAQS } from './action';

const initialState = {
  companyContactDetails: {
    email: '',
    phone: '',
    customerSupportHours: '',
  },
  faqs: [],
};

const updateCompanyContactDetails = produce((draft, action) => {
  draft.companyContactDetails = Object.assign(
    draft.companyContactDetails,
    action.payload.companyContactDetails,
  );
  draft.faqs = Object.assign(draft.faqs, action.payload.faqs);
});

const reducer = createReducer(initialState, {
  [UPDATE_COMPANY_CONTACT_DETAILS_AND_FAQS]: updateCompanyContactDetails,
});

export default reducer;
