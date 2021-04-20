import { call, put, takeLatest } from 'redux-saga/effects';
import usefulDocumentsSaga, { getUsefulDocumentsSaga } from '../saga';
import { GET_USEFUL_DOCUMENTS, updateUsefulDocuments } from '../action';
import getUsefulDocuments from '../api';

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield ['STOP_LOADER', id];
  },
}));

describe('Useful documents saga', () => {
  it('should watch actions', () => {
    const generator = usefulDocumentsSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      takeLatest(GET_USEFUL_DOCUMENTS, getUsefulDocumentsSaga),
    );
  });

  it('should update useful documents', () => {
    const getUsefulDocumentsApiResponse = [{ id: 1 }];
    const generator = getUsefulDocumentsSaga();

    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toMatchObject(call(getUsefulDocuments));

    next = generator.next(getUsefulDocumentsApiResponse);
    expect(next.value).toMatchObject(put(updateUsefulDocuments([{ id: 1 }])));

    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);

    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should not update useful documents when there is no response from api', () => {
    const generator = getUsefulDocumentsSaga();

    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toMatchObject(call(getUsefulDocuments));

    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);

    next = generator.next();
    expect(next.done).toBe(true);
  });
});
