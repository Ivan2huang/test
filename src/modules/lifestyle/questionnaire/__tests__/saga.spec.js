import { takeLatest, takeLeading, call, put, all } from 'redux-saga/effects';

import questionnaireSaga, {
  submitQuestionnaire,
  getFaceAgingImageSaga,
} from '../saga';
import {
  submitLifestyleQuestionnaire,
  uploadFaceAgingImage,
  getFaceAgingImage,
  deleteFaceAgingImage,
} from '../api';
import { navigateTo } from '../../../../helpers/helpers';
import { updateFaceAgingImage, toggleErrorModal } from '../action';

jest.mock('../../../loader', () => ({
  *loader(task, id, message) {
    yield ['START_LOADER', id, message];
    yield* task();
    yield ['STOP_LOADER', id];
  },
}));

jest.mock('../action', () => ({
  SUBMIT_LIFESTYLE_QUESTIONNAIRE: 'SUBMIT_LIFESTYLE_QUESTIONNAIRE',
  GET_FACE_AGING_IMAGE: 'GET_FACE_AGING_IMAGE',
  UPDATE_FACE_AGING_IMAGE: 'UPDATE_FACE_AGING_IMAGE',
  updateFaceAgingImage: payload => ({ type: 'UPDATE_IMAGE', payload }),
  toggleErrorModal: payload => ({ type: 'TOGGLE_ERROR_MODAL', payload }),
}));

jest.mock('../api', () => ({
  submitLifestyleQuestionnaire: jest.fn(),
  uploadFaceAgingImage: jest.fn(),
  getFaceAgingImage: jest.fn(),
  deleteFaceAgingImage: jest.fn(),
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    error: '/error',
    lifestyle: '/lifestyle',
  },
}));

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

describe('Questionnaire Saga ', () => {
  it('should watch action', () => {
    const generator = questionnaireSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      takeLeading('SUBMIT_LIFESTYLE_QUESTIONNAIRE', submitQuestionnaire),
      takeLatest('GET_FACE_AGING_IMAGE', getFaceAgingImageSaga),
    );
  });
  describe('api success scenarios', () => {
    it('should handle success scenario for submit questionnaire when image is not changed', () => {
      const action = {
        type: 'SUBMIT_LIFESTYLE_QUESTIONNAIRE',
        payload: {
          data: {
            aboutMe: {
              height: 10,
              waistCircumference: 50,
            },
            futureMe: {
              image: 'test.png',
            },
            isFaceAgingImageChanged: false,
          },
        },
      };
      const expectedStartLoader = ['START_LOADER', 'page', undefined];
      const expectedStopLoader = ['STOP_LOADER', 'page'];

      const generator = submitQuestionnaire(action);
      const startLoader = generator.next();
      const submitLifestyleQuestionnaireApiCall = generator.next();
      const redirectToLifestyle = generator.next([]);
      const stopLoader = generator.next();
      const finish = generator.next();

      expect(startLoader.value).toStrictEqual(expectedStartLoader);
      expect(submitLifestyleQuestionnaireApiCall.value).toEqual(
        all([call(submitLifestyleQuestionnaire, action.payload.data)]),
      );
      expect(redirectToLifestyle.value).toStrictEqual(
        call(navigateTo, '/lifestyle'),
      );
      expect(stopLoader.value).toStrictEqual(expectedStopLoader);
      expect(finish.done).toStrictEqual(true);
    });

    it('should handle success scenario for submit questionnaire when image is updated', () => {
      const action = {
        type: 'SUBMIT_LIFESTYLE_QUESTIONNAIRE',
        payload: {
          data: {
            aboutMe: {
              height: 10,
            },
            futureMe: {
              image: 'test.png',
            },
            isFaceAgingImageChanged: true,
          },
        },
      };
      const expectedStartLoader = ['START_LOADER', 'page', undefined];
      const expectedStopLoader = ['STOP_LOADER', 'page'];

      const generator = submitQuestionnaire(action);
      const startLoader = generator.next();
      const submitQuestionnaireAndUpdateImageApiCalls = generator.next();
      const redirectToLifestyle = generator.next([]);
      const stopLoader = generator.next();
      const finish = generator.next();

      expect(startLoader.value).toStrictEqual(expectedStartLoader);
      expect(submitQuestionnaireAndUpdateImageApiCalls.value).toStrictEqual(
        all([
          call(submitLifestyleQuestionnaire, action.payload.data),
          call(uploadFaceAgingImage, 'test.png'),
        ]),
      );
      expect(redirectToLifestyle.value).toStrictEqual(
        call(navigateTo, '/lifestyle'),
      );
      expect(stopLoader.value).toStrictEqual(expectedStopLoader);
      expect(finish.done).toStrictEqual(true);
    });

    it('should handle success scenario for submit questionnaire when image is deleted', () => {
      const action = {
        type: 'SUBMIT_LIFESTYLE_QUESTIONNAIRE',
        payload: {
          data: {
            aboutMe: {
              height: 10,
            },
            futureMe: {
              image: null,
            },
            isFaceAgingImageChanged: true,
          },
        },
      };
      const expectedStartLoader = ['START_LOADER', 'page', undefined];
      const expectedStopLoader = ['STOP_LOADER', 'page'];

      const generator = submitQuestionnaire(action);
      const startLoader = generator.next();
      const submitQuestionnaireAndDeleteImageApiCalls = generator.next();
      const redirectToLifestyle = generator.next([]);
      const stopLoader = generator.next();
      const finish = generator.next();

      expect(startLoader.value).toStrictEqual(expectedStartLoader);
      expect(submitQuestionnaireAndDeleteImageApiCalls.value).toStrictEqual(
        all([
          call(submitLifestyleQuestionnaire, action.payload.data),
          call(deleteFaceAgingImage),
        ]),
      );
      expect(redirectToLifestyle.value).toStrictEqual(
        call(navigateTo, '/lifestyle'),
      );
      expect(stopLoader.value).toStrictEqual(expectedStopLoader);
      expect(finish.done).toStrictEqual(true);
    });

    it('should handle get face aging image action when the image exists', () => {
      const expectedStartLoader = ['START_LOADER', 'page', undefined];
      const expectedStopLoader = ['STOP_LOADER', 'page'];

      const generator = getFaceAgingImageSaga();
      const startLoader = generator.next();
      const getFaceAgingImageApiCall = generator.next();
      const updateImage = generator.next({ size: 2 });
      const stopLoader = generator.next();
      const finish = generator.next();

      expect(startLoader.value).toStrictEqual(expectedStartLoader);
      expect(getFaceAgingImageApiCall.value).toEqual(call(getFaceAgingImage));
      expect(updateImage.value).toStrictEqual(
        put(updateFaceAgingImage({ size: 2 })),
      );
      expect(stopLoader.value).toStrictEqual(expectedStopLoader);
      expect(finish.done).toStrictEqual(true);
    });

    it('should handle get face aging image action when the image is empty', () => {
      const expectedStartLoader = ['START_LOADER', 'page', undefined];
      const expectedStopLoader = ['STOP_LOADER', 'page'];

      const generator = getFaceAgingImageSaga();
      const startLoader = generator.next();
      const getFaceAgingImageApiCall = generator.next();
      const updateImage = generator.next({ size: 0 });
      const stopLoader = generator.next();
      const finish = generator.next();

      expect(startLoader.value).toStrictEqual(expectedStartLoader);
      expect(getFaceAgingImageApiCall.value).toEqual(call(getFaceAgingImage));
      expect(updateImage.value).toStrictEqual(put(updateFaceAgingImage(null)));
      expect(stopLoader.value).toStrictEqual(expectedStopLoader);
      expect(finish.done).toStrictEqual(true);
    });
  });
  describe('api error scenarios', () => {
    it('should handle error scenario for submit questionnaire when image is not changed', () => {
      const action = {
        type: 'SUBMIT_LIFESTYLE_QUESTIONNAIRE',
        payload: {
          data: {
            aboutMe: {
              height: 10,
            },
            futureMe: {
              image: 'test.png',
            },
            isFaceAgingImageChanged: false,
          },
        },
      };
      const expectedStartLoader = ['START_LOADER', 'page', undefined];
      const expectedStopLoader = ['STOP_LOADER', 'page'];

      const generator = submitQuestionnaire(action);
      const startLoader = generator.next();
      const submitLifestyleQuestionnaireApiCall = generator.next();
      const redirectToLifestyle = generator.next([
        { error: 'submitLifeStyleQuestionnaire API error' },
      ]);
      const stopLoader = generator.next();
      const finish = generator.next();

      expect(startLoader.value).toStrictEqual(expectedStartLoader);
      expect(submitLifestyleQuestionnaireApiCall.value).toEqual(
        all([call(submitLifestyleQuestionnaire, action.payload.data)]),
      );
      expect(redirectToLifestyle.value).toStrictEqual(
        call(navigateTo, '/error'),
      );
      expect(stopLoader.value).toStrictEqual(expectedStopLoader);
      expect(finish.done).toStrictEqual(true);
    });

    it('should handle error scenario for submit questionnaire when image is updated', () => {
      const action = {
        type: 'SUBMIT_LIFESTYLE_QUESTIONNAIRE',
        payload: {
          data: {
            aboutMe: {
              height: 10,
            },
            futureMe: {
              image: 'test.png',
            },
            isFaceAgingImageChanged: true,
          },
        },
      };
      const expectedStartLoader = ['START_LOADER', 'page', undefined];
      const expectedStopLoader = ['STOP_LOADER', 'page'];

      const generator = submitQuestionnaire(action);
      const startLoader = generator.next();
      const submitQuestionnaireAndUpdateImageApiCalls = generator.next();
      const toggleErrorModalGenerator = generator.next([
        '',
        { error: 'update api call error' },
      ]);
      const stopLoader = generator.next();
      const finish = generator.next();

      expect(startLoader.value).toStrictEqual(expectedStartLoader);
      expect(submitQuestionnaireAndUpdateImageApiCalls.value).toStrictEqual(
        all([
          call(submitLifestyleQuestionnaire, action.payload.data),
          call(uploadFaceAgingImage, 'test.png'),
        ]),
      );
      expect(toggleErrorModalGenerator.value).toStrictEqual(
        put(toggleErrorModal(true)),
      );
      expect(stopLoader.value).toStrictEqual(expectedStopLoader);
      expect(finish.done).toStrictEqual(true);
    });

    it('should handle error scenario for submit questionnaire when image is deleted', () => {
      const action = {
        type: 'SUBMIT_LIFESTYLE_QUESTIONNAIRE',
        payload: {
          data: {
            aboutMe: {
              height: 10,
            },
            futureMe: {
              image: null,
            },
            isFaceAgingImageChanged: true,
          },
        },
      };
      const expectedStartLoader = ['START_LOADER', 'page', undefined];
      const expectedStopLoader = ['STOP_LOADER', 'page'];

      const generator = submitQuestionnaire(action);
      const startLoader = generator.next();
      const submitQuestionnaireAndDeleteImageApiCalls = generator.next();
      const toggleErrorModalGenerator = generator.next([
        '',
        { error: 'delete image api call error' },
      ]);

      const stopLoader = generator.next();
      const finish = generator.next();

      expect(startLoader.value).toStrictEqual(expectedStartLoader);
      expect(submitQuestionnaireAndDeleteImageApiCalls.value).toStrictEqual(
        all([
          call(submitLifestyleQuestionnaire, action.payload.data),
          call(deleteFaceAgingImage),
        ]),
      );
      expect(toggleErrorModalGenerator.value).toStrictEqual(
        put(toggleErrorModal(true)),
      );
      expect(stopLoader.value).toStrictEqual(expectedStopLoader);
      expect(finish.done).toStrictEqual(true);
    });
  });
});
