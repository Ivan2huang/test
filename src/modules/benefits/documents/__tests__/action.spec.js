import { getUsefulDocuments } from '../action';

describe('get useful documents action', () => {
  it('should create get useful documents action', () => {
    const expected = {
      type: `GET_USEFUL_DOCUMENTS`,
      payload: {},
    };

    const actual = getUsefulDocuments();

    expect(actual).toMatchObject(expected);
  });
});
