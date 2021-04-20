/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_PRODUCT_NAME } from './action';

export const initialState = {
  productName: '',
};

const updateProductName = produce((draft, action) => {
  const { productName } = action.payload;

  draft.productName = productName;
});

const reducer = createReducer(initialState, {
  [UPDATE_PRODUCT_NAME]: updateProductName,
});

export default reducer;
