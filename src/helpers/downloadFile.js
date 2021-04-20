import { fetchFile } from './fetch';

const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

const downloadFileAsync = async (url, fileName) => {
  const response = await fetchFile(url);
  if (response) {
    const blob = new Blob([response]);
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
      return SUCCESS;
    }
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return SUCCESS;
  }
  return ERROR;
};

export default downloadFileAsync;
