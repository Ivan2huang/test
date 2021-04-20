import {
  submitLifeStyleQuestionnaire,
  getFaceAgingImage,
  updateFaceAgingImage,
} from '../action';

describe('Questionnaire Action', () => {
  it('should create submit lifestyle questionnaire action', () => {
    const data = {
      height: 156,
      weight: 75,
    };
    const expected = {
      type: 'SUBMIT_LIFESTYLE_QUESTIONNAIRE',
      payload: {
        data: {
          height: 156,
          weight: 75,
        },
      },
    };

    const actual = submitLifeStyleQuestionnaire(data);

    expect(actual).toStrictEqual(expected);
  });

  it('should create get face aging image action', () => {
    const expected = {
      type: 'GET_FACE_AGING_IMAGE',
      payload: {},
    };

    const actual = getFaceAgingImage();

    expect(actual).toStrictEqual(expected);
  });

  it('should create update face aging image action', () => {
    const expected = {
      type: 'UPDATE_FACE_AGING_IMAGE',
      payload: {
        image: 'http://test.jpg',
      },
    };

    const actual = updateFaceAgingImage('http://test.jpg');

    expect(actual).toStrictEqual(expected);
  });
});
