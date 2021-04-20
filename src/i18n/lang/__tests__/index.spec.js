import { messages } from '../index';

jest.mock('../en-HK.json', () => ({ a: 'b' }));
jest.mock('../zh-HK.json', () => ({ c: 'd' }));
jest.mock('../th-TH.json', () => ({ e: 'f' }));

describe('Lang', () => {
  it('should have message for en and zh in messages', () => {
    expect(Object.keys(messages).length).toBe(3);
    expect(messages).toEqual({
      'en-HK': { a: 'b' },
      'zh-HK': { c: 'd' },
      'th-TH': { e: 'f' },
    });
  });
});
