import reducer from '../reducer';

describe('Useful Documents reducer', () => {
  it('should update useful documents', () => {
    const initialState = {
      usefulDocuments: [],
    };
    const action = {
      type: 'UPDATE_USEFUL_DOCUMENTS',
      payload: {
        usefulDocuments: [
          {
            id: 1,
            title: 'HSBC HealthPlus – Outpatient Benefit',
          },
          {
            id: 3,
            title: 'HSBC HealthPlus –  Hospitalisation',
          },
        ],
      },
    };
    const expected = {
      usefulDocuments: [
        {
          id: 1,
          title: 'HSBC HealthPlus – Outpatient Benefit',
        },
        {
          id: 3,
          title: 'HSBC HealthPlus –  Hospitalisation',
        },
      ],
    };

    const actual = reducer(initialState, action);

    expect(actual).toMatchObject(expected);
  });
});
