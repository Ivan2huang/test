import { fetchData, fetchFile, uploadFile } from '../../../helpers/fetch';
import URL from '../../../helpers/url';
import { QUESTIONNAIRE_TYPES } from './constants';

const transformQuestionnaireData = formData => {
  const { isAsian, heightTwo, ...aboutMe } = formData[
    QUESTIONNAIRE_TYPES.aboutMe
  ];

  return {
    ...aboutMe,
    heightTwo: heightTwo || 0,
    ethnicity: isAsian ? 'EastAsian' : 'Other',
    ...formData[QUESTIONNAIRE_TYPES.choices],
    ...formData[QUESTIONNAIRE_TYPES.health],
  };
};

export const submitLifestyleQuestionnaire = formData => {
  const data = transformQuestionnaireData(formData);
  return fetchData('post', URL.submitLifestyleQuestionnaire, data, true);
};

export const uploadFaceAgingImage = image => {
  const fileFormData = new FormData();
  fileFormData.append('image', image);
  return uploadFile('post', URL.lifestyleFaceImage, fileFormData, true);
};

export const getFaceAgingImage = () => {
  return fetchFile(URL.lifestyleFaceImage);
};

export const deleteFaceAgingImage = () => {
  return fetchData('delete', URL.lifestyleFaceImage, true);
};
