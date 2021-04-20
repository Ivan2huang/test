import actionCreator from '../../../helpers/action';

export const GET_COMPANY_CONTACT_DETAILS_AND_FAQS =
  'GET_COMPANY_CONTACT_DETAILS_AND_FAQs';
export const UPDATE_COMPANY_CONTACT_DETAILS_AND_FAQS =
  'UPDATE_COMPANY_CONTACT_DETAILS_AND_FAQs';

export const getCompanyContactDetailsAndFAQs = actionCreator(
  GET_COMPANY_CONTACT_DETAILS_AND_FAQS,
  'locale',
);

export const updateCompanyContactDetailsAndFAQs = actionCreator(
  UPDATE_COMPANY_CONTACT_DETAILS_AND_FAQS,
  'companyContactDetails',
  'faqs',
);
