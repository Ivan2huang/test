import getLifeStyleDetails from '../api';
import { fetchData } from '../../../helpers/fetch';

jest.mock('../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

describe('Lifestyle Api', () => {
  it('should get lifestyle details', async () => {
    const expected = {
      height: 160,
      weight: 40,
      waistCircumference: null,
      ethnicity: 'EastAsian',
      smokingBehaviour: 'NonSmoker',
      alcoholConsumptionFrequency: 'TwoToFourTimesAMonth',
      exerciseFrequency: 4,
      healthyDietIntention: 'Yes',
      eatingIntentionPerseverance: 'Sometimes',
      resistingTemptingFood: 'Sometimes',
      distractedFromTheWayIWantToEat: 'Always',
      acceptanceToChangingEatingBehaviour: 'Always',
      rememberFoodConsumed: 'Never',
      hereditaryDiabetes: 'Yes',
      highBloodPressure: 'No',
      uninterestFrequency: 'Regularly',
      depressionFrequency: 'Regularly',
      drowsinessFrequency: 'Regularly',
      sleepDuration: 'Brief',
      temptingFoodItems: ['IceCream', 'BreadOrToast'],
      alcoholConsumptionAmount: 'FiveOrSix',
      exerciseMinuteFrequency: 'ThirtyToFortyMins',
      avoidingTemptingFood: 'Yes',
    };
    fetchData.mockReturnValue(expected);
    const actual = await getLifeStyleDetails();

    expect(actual).toEqual(expected);
  });

  it('should get false when lifestyle api response is undefined', async () => {
    const expected = null;
    fetchData.mockReturnValue(undefined);
    const actual = await getLifeStyleDetails();

    expect(actual).toEqual(expected);
  });

  it('should get false when lifestyle api response is empty', async () => {
    const expected = null;
    fetchData.mockReturnValue({});
    const actual = await getLifeStyleDetails();

    expect(actual).toEqual(expected);
  });
});
