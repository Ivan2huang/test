import {
  submitLifestyleQuestionnaire,
  uploadFaceAgingImage,
  getFaceAgingImage,
  deleteFaceAgingImage,
} from '../api';
import { fetchData, uploadFile, fetchFile } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
  uploadFile: jest.fn(),
  fetchFile: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  submitLifestyleQuestionnaire: 'test/lifestyleresponse',
  lifestyleFaceImage: 'test/faceagingimage',
}));

describe('Questionnaire Api', () => {
  it('should submit lifestyle questionnaire for asian', async () => {
    const submitQuestionnaireResponse = {
      success: true,
    };
    const formValues = {
      aboutMe: {
        heightOne: 150,
        weight: 105,
        waistCircumference: 100,
        isAsian: true,
      },
      choices: {
        smokingBehaviour: 'NonSmoker',
        alcoholConsumptionFrequency: 'MonthlyOrLess',
        alcoholConsumptionAmount: 'OneOrTwo',
        exerciseFrequency: 0,
        healthyDietIntention: 'Yes',
        eatingIntentionPerseverance: 'Always',
        resistingTemptingFood: 'Always',
        distractedFromTheWayIWantToEat: 'Always',
        acceptanceToChangingEatingBehaviour: 'Always',
        rememberFoodConsumed: 'Always',
        temptingFoodItems: ['Chocolate'],
        exerciseMinuteFrequency: 'UpToFifteenMins',
        avoidingTemptingFood: 'Yes',
      },
      health: {
        hereditaryDiabetes: 'No',
        highBloodPressure: 'Yes',
        uninterestFrequency: 'Never',
        depressionFrequency: 'Never',
        drowsinessFrequency: 'Never',
        sleepDuration: 'Brief',
      },
    };
    const lifestyleData = {
      heightOne: 150,
      heightTwo: 0,
      weight: 105,
      waistCircumference: 100,
      ethnicity: 'EastAsian',
      smokingBehaviour: 'NonSmoker',
      alcoholConsumptionFrequency: 'MonthlyOrLess',
      alcoholConsumptionAmount: 'OneOrTwo',
      exerciseFrequency: 0,
      healthyDietIntention: 'Yes',
      eatingIntentionPerseverance: 'Always',
      resistingTemptingFood: 'Always',
      distractedFromTheWayIWantToEat: 'Always',
      acceptanceToChangingEatingBehaviour: 'Always',
      rememberFoodConsumed: 'Always',
      temptingFoodItems: ['Chocolate'],
      exerciseMinuteFrequency: 'UpToFifteenMins',
      avoidingTemptingFood: 'Yes',
      hereditaryDiabetes: 'No',
      highBloodPressure: 'Yes',
      uninterestFrequency: 'Never',
      depressionFrequency: 'Never',
      drowsinessFrequency: 'Never',
      sleepDuration: 'Brief',
    };

    fetchData.mockReturnValue(submitQuestionnaireResponse);

    const actual = await submitLifestyleQuestionnaire(formValues);

    expect(actual).toEqual(submitQuestionnaireResponse);
    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/lifestyleresponse',
      lifestyleData,
      true,
    );
  });

  it('should submit lifestyle questionnaire for asian with heightTwo', async () => {
    const submitQuestionnaireResponse = {
      success: true,
    };
    const formValues = {
      aboutMe: {
        heightOne: 150,
        heightTwo: 5,
        weight: 105,
        waistCircumference: 100,
        isAsian: true,
      },
      choices: {
        smokingBehaviour: 'NonSmoker',
        alcoholConsumptionFrequency: 'MonthlyOrLess',
        alcoholConsumptionAmount: 'OneOrTwo',
        exerciseFrequency: 0,
        healthyDietIntention: 'Yes',
        eatingIntentionPerseverance: 'Always',
        resistingTemptingFood: 'Always',
        distractedFromTheWayIWantToEat: 'Always',
        acceptanceToChangingEatingBehaviour: 'Always',
        rememberFoodConsumed: 'Always',
        temptingFoodItems: ['Chocolate'],
        exerciseMinuteFrequency: 'UpToFifteenMins',
        avoidingTemptingFood: 'Yes',
      },
      health: {
        hereditaryDiabetes: 'No',
        highBloodPressure: 'Yes',
        uninterestFrequency: 'Never',
        depressionFrequency: 'Never',
        drowsinessFrequency: 'Never',
        sleepDuration: 'Brief',
      },
    };
    const lifestyleData = {
      heightOne: 150,
      heightTwo: 5,
      weight: 105,
      waistCircumference: 100,
      ethnicity: 'EastAsian',
      smokingBehaviour: 'NonSmoker',
      alcoholConsumptionFrequency: 'MonthlyOrLess',
      alcoholConsumptionAmount: 'OneOrTwo',
      exerciseFrequency: 0,
      healthyDietIntention: 'Yes',
      eatingIntentionPerseverance: 'Always',
      resistingTemptingFood: 'Always',
      distractedFromTheWayIWantToEat: 'Always',
      acceptanceToChangingEatingBehaviour: 'Always',
      rememberFoodConsumed: 'Always',
      temptingFoodItems: ['Chocolate'],
      exerciseMinuteFrequency: 'UpToFifteenMins',
      avoidingTemptingFood: 'Yes',
      hereditaryDiabetes: 'No',
      highBloodPressure: 'Yes',
      uninterestFrequency: 'Never',
      depressionFrequency: 'Never',
      drowsinessFrequency: 'Never',
      sleepDuration: 'Brief',
    };

    fetchData.mockReturnValue(submitQuestionnaireResponse);

    const actual = await submitLifestyleQuestionnaire(formValues);

    expect(actual).toEqual(submitQuestionnaireResponse);
    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/lifestyleresponse',
      lifestyleData,
      true,
    );
  });

  it('should submit lifestyle questionnaire for non asian', async () => {
    const submitQuestionnaireResponse = {
      success: true,
    };
    const formValues = {
      aboutMe: {
        isAsian: false,
      },
    };
    const lifestyleData = {
      ethnicity: 'Other',
    };

    fetchData.mockReturnValue(submitQuestionnaireResponse);

    const actual = await submitLifestyleQuestionnaire(formValues);

    expect(actual).toEqual(submitQuestionnaireResponse);
    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/lifestyleresponse',
      expect.objectContaining(lifestyleData),
      true,
    );
  });

  it('should upload face aging image', async () => {
    const file = { name: 'test.pdf' };
    const fileFormData = new FormData();
    fileFormData.append('image', file);

    await uploadFaceAgingImage(file);

    expect(uploadFile).toHaveBeenCalledWith(
      'post',
      'test/faceagingimage',
      fileFormData,
      true,
    );
  });

  it('should get face aging image', async () => {
    await getFaceAgingImage();

    expect(fetchFile).toHaveBeenCalledWith('test/faceagingimage');
  });

  it('should delete face aging photo', async () => {
    await deleteFaceAgingImage();

    expect(fetchData).toHaveBeenCalledWith(
      'delete',
      'test/faceagingimage',
      true,
    );
  });
});
