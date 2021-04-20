import { required, email, password, maxLength } from '../validation';

describe('Validation Helper', () => {
  describe('Required', () => {
    it('should return true if value is not present', () => {
      const actual = required();

      expect(actual).toBe(true);
    });

    it('should return false if value is present', () => {
      const actual = required('testing');

      expect(actual).toBe(false);
    });
  });

  describe('Email', () => {
    it('should return true if email is not valid', () => {
      const actual = email('testing');

      expect(actual).toBe(true);
    });

    it('should return false if email is valid', () => {
      const actual = email('testing@gmail.com');

      expect(actual).toBe(false);
    });
  });
});

describe('Password', () => {
  it('should return true if password is not contains atleast one lower case char', () => {
    const actual = password('ANHJ781@56');

    expect(actual).toBe(true);
  });
  it('should return true if password is not contains atleast one upper case char', () => {
    const actual = password('7nsjcmn@s');

    expect(actual).toBe(true);
  });
  it('should return true if password is not contains atleast one numeric char', () => {
    const actual = password('Ansj#cmns');

    expect(actual).toBe(true);
  });
  it('should return true if password is not contains atleast eight characters', () => {
    const actual = password('Ans@7s');

    expect(actual).toBe(true);
  });

  it('should return false if password is matching criteria', () => {
    const actual = password('Abc@ef4u');

    expect(actual).toBe(false);
  });
});

describe('MaxLength', () => {
  const params = {
    value: '',
    max: 1,
  };

  it('should return false when provided empty value', () => {
    const actual = maxLength(params.max, params.value);

    expect(!!actual).toBe(false);
  });

  it('should return false when provided value length less than max', () => {
    params.value = 'test';
    params.max = 5;
    const actual = maxLength(params.max, params.value);

    expect(!!actual).toBe(false);
  });

  it('should return false when provided value length equal max', () => {
    params.value = 'test';
    params.max = 4;
    const actual = maxLength(params.max, params.value);

    expect(!!actual).toBe(false);
  });

  it('should return true when provided value length greater than max', () => {
    params.value = 'test';
    params.max = 3;
    const actual = maxLength(params.max, params.value);

    expect(!!actual).toBe(true);
  });
});
