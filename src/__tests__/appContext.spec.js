import getAppContext from '../appContext';

jest.mock('../constants/config', () => ({
  defaultLanguage: 'en-HK',
}));

describe('App Context', () => {
  it('should return same object on every initialisation', () => {
    const appContext = getAppContext();
    const appContext1 = getAppContext();

    expect(appContext === appContext1).toEqual(true);
  });

  it('should be able to set and get the key-value pairs', () => {
    const appContext = getAppContext();
    appContext.set('foo', 'bar');

    expect(appContext.get('foo')).toEqual('bar');
    expect(appContext.get('foo1')).toBeUndefined();
  });

  it('should set default locale after initialisation', () => {
    const appContext = getAppContext();

    expect(appContext.get('locale')).toEqual('en-HK');
  });
});
