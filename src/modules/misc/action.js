import actionCreator from '../../helpers/action';

export const GET_CONTACT_INFO = 'GET_CONTACT_INFO';
export const UPDATE_CONTACT_INFO = 'UPDATE_CONTACT_INFO';

export const getContactInfo = actionCreator(GET_CONTACT_INFO, 'locale');
export const updateContactInfo = actionCreator(
  UPDATE_CONTACT_INFO,
  'contactInfo',
);
