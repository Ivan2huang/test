import { put } from 'redux-saga/effects';

import { loader, loaderDetail } from '../util';
import { startLoader, stopLoader } from '../action';

describe('Loader Util', () => {
  it('should start and stop a loader with message and execute respective tasks', () => {
    const task = function*() {
      yield 'task-1';
      yield 'task-2';
    };
    const id = 'loader1';
    const message = 'loading...';

    const loaderIterator = loader(task, id, message);
    let next = loaderIterator.next();
    expect(next.value).toEqual(put(startLoader(id, message)));

    next = loaderIterator.next();
    expect(next.value).toBe('task-1');

    next = loaderIterator.next();
    expect(next.value).toBe('task-2');

    next = loaderIterator.next();
    expect(next.value).toEqual(put(stopLoader(id)));

    next = loaderIterator.next();
    expect(next.done).toBe(true);
  });

  it('should start and stop a loader without message and execute respective tasks', () => {
    const task = function*() {
      yield 'task-1';
      yield 'task-2';
    };
    const id = 'loader1';

    const loaderIterator = loader(task, id);
    let next = loaderIterator.next();
    expect(next.value).toEqual(put(startLoader(id, '')));

    next = loaderIterator.next();
    expect(next.value).toBe('task-1');

    next = loaderIterator.next();
    expect(next.value).toBe('task-2');

    next = loaderIterator.next();
    expect(next.value).toEqual(put(stopLoader(id)));

    next = loaderIterator.next();
    expect(next.done).toBe(true);
  });

  it('should return the empty loading detail if loader is not present', () => {
    const loaderObj = {
      loader1: {
        counter: 0,
        message: 'loading 1',
      },
      loader2: {
        counter: 0,
        message: 'loading 2',
      },
    };
    const expected = {
      loading: false,
      message: '',
      loaded: false,
    };

    const actual = loaderDetail(loaderObj, 'loader3');

    expect(actual).toEqual(expected);
  });

  it('should return the loading detail with loading to true if loader counter is greater than 0', () => {
    const loaderObj = {
      loader1: {
        counter: 1,
        message: 'loading 1',
      },
      loader2: {
        counter: 0,
        message: 'loading 2',
      },
    };
    const expected = {
      loading: true,
      message: 'loading 1',
    };

    const actual = loaderDetail(loaderObj, 'loader1');

    expect(actual).toEqual(expected);
  });

  it('should return the loading detail with loading to false if loader counter is less than 1', () => {
    const loaderObj = {
      loader1: {
        counter: 0,
        message: 'loading 1',
      },
      loader2: {
        counter: 0,
        message: 'loading 2',
      },
    };
    const expected = {
      loading: false,
      message: 'loading 1',
    };

    const actual = loaderDetail(loaderObj, 'loader1');

    expect(actual).toEqual(expected);
  });
});
