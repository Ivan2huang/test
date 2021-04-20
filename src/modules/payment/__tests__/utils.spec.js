import {
  convertObjectToParam,
  convertParamToObject,
  transformPaymentResponse,
} from '../util';

describe('Convert Object To Params', () => {
  it('should handle the param is object', async () => {
    const expectResult = 'key=value&key2=value2';
    const actual = convertObjectToParam({ key: 'value', key2: 'value2' });

    expect(actual).toEqual(expectResult);
  });

  it('should handle the param is empty', async () => {
    const expectResult = '';
    const actual = convertObjectToParam();

    expect(actual).toEqual(expectResult);
  });
});

describe('Convert Param To Object', () => {
  it('should handle the param is object', async () => {
    Object.fromEntries = l => l.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

    const expectResult = { key: 'value', key2: 'value2' };
    const actual = convertParamToObject('key=value&key2=value2');

    expect(actual).toEqual(expectResult);
  });

  it('should handle the param is empty', async () => {
    const expectResult = {};
    const actual = convertParamToObject();

    expect(actual).toEqual(expectResult);
  });
});

describe('transformPaymentResponse', () => {
  it('should transform paymentMethods', async () => {
    const input = {
      a: 1,
      payment: {
        paymentProcessors: {
          test: 'test',
        },
      },
    };
    const expectResult = {
      a: 1,
      payment: {
        paymentProcessors: {
          test: 'test',
        },
      },
      paymentMethods: {
        test: 'test',
      },
    };
    const actual = transformPaymentResponse(input);

    expect(actual).toEqual(expectResult);
  });
});
