import actionCreator from '../../../helpers/action';

export const GET_USEFUL_DOCUMENTS = 'GET_USEFUL_DOCUMENTS';
export const UPDATE_USEFUL_DOCUMENTS = 'UPDATE_USEFUL_DOCUMENTS';

export const getUsefulDocuments = actionCreator(GET_USEFUL_DOCUMENTS);
export const updateUsefulDocuments = actionCreator(
  UPDATE_USEFUL_DOCUMENTS,
  'usefulDocuments',
);
