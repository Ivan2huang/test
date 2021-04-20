import getAppContext from '../appContext';

const getLocale = () => {
  return getAppContext().get('locale');
};

export default getLocale;
