import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getNewsLetterCondition } from '../api';

import termsSaga, { getNewsLetterSaga } from '../saga';
import { updateNewsLetter } from '../action';

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../api', () => ({
  getNewsLetterCondition: jest.fn(),
}));

jest.mock('../action', () => ({
  getNewsLetter: payload => ({
    type: 'GET_NEWS_LETTER',
    payload,
  }),
  updateNewsLetter: payload => ({
    type: 'UPDATE_NEWS_LETTER',
    payload,
  }),
  GET_NEWS_LETTER: 'GET_NEWS_LETTER',
}));

jest.mock('../../../../i18n/getLocale', () => ({
  __esModule: true,
  default: jest.fn(() => 'zh-HK'),
}));

describe('News Letter saga', () => {
  it('should watch action', () => {
    const generator = termsSaga();

    const next = generator.next();

    expect(next.value).toStrictEqual(
      takeLatest('GET_NEWS_LETTER', getNewsLetterSaga),
    );
  });

  it('should handle get news content if response more than 1 result', () => {
    const generator = getNewsLetterSaga();

    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toStrictEqual(
      all([
        call(getNewsLetterCondition, 'en-HK'),
        call(getNewsLetterCondition, 'zh-HK'),
      ]),
    );

    next = generator.next(['english content', 'chinese content']);
    expect(next.value).toEqual(
      put(
        updateNewsLetter({
          'en-HK': 'english content',
          'zh-HK': 'chinese content',
        }),
      ),
    );

    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
  });

  it('should handle get news content if response less than or equal 1 result', () => {
    const generator = getNewsLetterSaga();

    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toStrictEqual(
      all([
        call(getNewsLetterCondition, 'en-HK'),
        call(getNewsLetterCondition, 'zh-HK'),
      ]),
    );

    next = generator.next(['chinese content']);
    expect(next.value).toEqual(
      put(
        updateNewsLetter({
          'zh-HK': 'chinese content',
        }),
      ),
    );

    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
  });
});
