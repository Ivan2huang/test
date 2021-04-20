import { call, put, takeLatest } from 'redux-saga/effects';

import faceAgingSaga, {
  getFaceAgingCategoriesSaga,
  deleteFaceAgingImageSaga,
} from '../saga';
import getFaceAgingCategories, { deleteFaceAgingImage } from '../api';
import { updateUserFaceAgingCategories } from '../action';
import { updateError } from '../../../error/action';
import ERROR from '../../../../constants/error';
import { delay, navigateTo } from '../../../../helpers/helpers';

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../api', () => ({
  __esModule: true,
  default: jest.fn(),
  deleteFaceAgingImage: jest.fn(),
}));

jest.mock('../action', () => ({
  updateUserFaceAgingCategories: payload => ({
    type: 'UPDATE_USER_FACE_AGING_CATEGORIES',
    payload,
  }),
  GET_USER_FACE_AGING_CATEGORIES: 'GET_USER_FACE_AGING_CATEGORIES',
}));

jest.mock('../../../error/action', () => ({
  updateError: (id, state) => ({
    type: 'UPDATE_ERROR',
    payload: {
      id,
      state,
    },
  }),
}));

jest.mock('../../../../helpers/helpers', () => ({
  delay: jest.fn(),
  navigateTo: jest.fn(),
}));

describe('Face Aging saga', () => {
  it('should watch action', () => {
    const generator = faceAgingSaga();

    const next = generator.next();

    expect(next.value).toStrictEqual(
      takeLatest('GET_USER_FACE_AGING_CATEGORIES', getFaceAgingCategoriesSaga),
    );
  });

  it('should handle get face aging categories in success scenario', () => {
    const faceAgingCategoriesResponse = {
      faceAgingIsDone: true,
      results: [{ category: 'healthy', age: 35 }],
    };
    const generator = getFaceAgingCategoriesSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'faceAgingCategories']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.faceAgingCategories, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getFaceAgingCategories));
    next = generator.next(faceAgingCategoriesResponse);
    expect(next.value).toStrictEqual(
      put(
        updateUserFaceAgingCategories(
          faceAgingCategoriesResponse.faceAgingIsDone,
          faceAgingCategoriesResponse.results,
        ),
      ),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle get face aging categories in error scenario', () => {
    const generator = getFaceAgingCategoriesSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'faceAgingCategories']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.faceAgingCategories, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getFaceAgingCategories));
    next = generator.next({ error: true });
    expect(next.value).toStrictEqual(call(deleteFaceAgingImage));
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.faceAgingCategories, true)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle get face aging categories when response is empty', () => {
    const generator = getFaceAgingCategoriesSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'faceAgingCategories']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.faceAgingCategories, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getFaceAgingCategories));
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateUserFaceAgingCategories(false, [])),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should try calling the api multiple times until faceImageIsDone is set true  ', () => {
    const generator = getFaceAgingCategoriesSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'faceAgingCategories']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.faceAgingCategories, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getFaceAgingCategories));
    next = generator.next({
      faceAgingIsDone: false,
      results: [],
    });
    expect(next.value).toStrictEqual(call(delay, 10000));
    next = generator.next();
    expect(next.value).toStrictEqual(call(getFaceAgingCategories));
    next = generator.next({
      faceAgingIsDone: true,
      results: [{ category: 'healthy', age: 35 }],
    });
    expect(next.value).toStrictEqual(
      put(
        updateUserFaceAgingCategories(true, [{ category: 'healthy', age: 35 }]),
      ),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle delete face aging image success when try again', () => {
    const generator = deleteFaceAgingImageSaga();

    let next = generator.next();
    expect(next.value).toStrictEqual(call(deleteFaceAgingImage));
    next = generator.next();
    expect(next.value).toStrictEqual(
      call(navigateTo, '/lifestyle/questionnaire', {
        pos: 'faceAging',
      }),
    );
  });

  it('should handle delete face aging image error when try again', () => {
    const generator = deleteFaceAgingImageSaga();

    let next = generator.next();
    expect(next.value).toStrictEqual(call(deleteFaceAgingImage));
    next = generator.next({ error: true });
    expect(next.value).toStrictEqual(call(navigateTo, '/error'));
  });
});
