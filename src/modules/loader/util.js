import { put } from 'redux-saga/effects';

import { startLoader, stopLoader } from './action';

export function* loader(task, id, message = '') {
  try {
    yield put(startLoader(id, message));
    yield* task();
  } finally {
    yield put(stopLoader(id));
    // console.log(id + 'saga was cancelled');
  }
}

export const loaderDetail = (loaderObj, id) => {
  if (!loaderObj[id])
    return {
      loaded: false,
      loading: false,
      message: '',
    };
  return {
    loading: loaderObj[id].counter > 0,
    message: loaderObj[id].message,
    loaded: loaderObj[id].loaded,
  };
};
