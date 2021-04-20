import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const contentType = {
  pdf: 'pdf',
};

const transformUsefulDocuments = usefulDocuments => {
  return Promise.all(
    usefulDocuments.map(async document => {
      return {
        name: document.title,
        url: URL.getUsefulDocument(document.id),
        contentType: contentType.pdf,
      };
    }),
  );
};

const getUsefulDocuments = async () => {
  const response = await fetchData('get', URL.getUsefulDocuments);
  return response && transformUsefulDocuments(response);
};

export default getUsefulDocuments;
