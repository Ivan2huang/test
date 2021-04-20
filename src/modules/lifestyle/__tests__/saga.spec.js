import { takeLatest, call, put } from 'redux-saga/effects';

import lifestyleSaga, { getLifestyleDetailsSaga } from '../saga';
import { GET_LIFESTYLE_DETAILS, updateLifestyleDetails } from '../action';
import getLifeStyleDetails from '../api';

jest.mock('../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

describe('Lifestyle saga', () => {
  it('should watch action', () => {
    const generator = lifestyleSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      takeLatest(GET_LIFESTYLE_DETAILS, getLifestyleDetailsSaga),
    );
  });

  it('should handle get lifestyle with all success scenarios', () => {
    const lifestyleResponse = {
      height: 160,
      weight: 40,
      waistCircumference: null,
      ethnicity: 'EastAsian',
      smokingBehaviour: 'NonSmoker',
    };
    const generator = getLifestyleDetailsSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(getLifeStyleDetails));
    next = generator.next(lifestyleResponse);
    expect(next.value).toEqual(put(updateLifestyleDetails(lifestyleResponse)));
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });
});
