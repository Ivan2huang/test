import filterSelector from '../selector';

describe('Clinic selector', () => {
  it('should provide areas and consultation type', () => {
    const clinics = [
      {
        name: 'Dr Test Clinic',
        latitude: 1.3006643,
        consultationType: 'test consultation1',
        longitude: 103.8001065,
        address: 'teststreet, test house',
        area: 'Area1',
        district: 'Central1',
      },
      {
        name: 'Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
        consultationType: 'test consultation2',
        address: 'test1street, test1 house',
        area: 'Area2',
        district: 'Central2',
      },
      {
        name: 'Test1 Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
        consultationType: 'test consultation1',
        address: 'test1street, test1 house',
        area: 'Area2',
        district: 'Central2',
      },
      {
        name: 'dummy Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
        address: 'test1street, test1 house',
        consultationType: 'test consultation2',
        area: 'Area1',
        district: 'Central3',
      },
    ];

    const expected = {
      areas: {
        Area1: ['Central1', 'Central3'],
        Area2: ['Central2'],
      },
      consultationTypes: ['test consultation1', 'test consultation2'],
    };

    const actual = filterSelector(clinics);

    expect(actual).toEqual(expected);
  });
});
