/* eslint-disable import/no-cycle */
import url from './url';
import paths from './paths';
import { error as errorCodes } from '../constants/auth';

let requestsToRefresh = [];
let isRefreshRequesting = false;

export default axios => {
  if (axios) {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      err => {
        const { response, config } = err;

        if ([401, 403].indexOf(response.status) !== -1) {
          if (!isRefreshRequesting) {
            isRefreshRequesting = true;
            axios
              .get(url.refreshToken)
              .then(({ data }) => {
                const { isSuccess, error } = data;
                if (isSuccess) {
                  requestsToRefresh.forEach(cb => cb(true));
                } else {
                  const redirectUrl =
                    error === errorCodes.token.invalidRefreshToken
                      ? paths.common.tokenExpired
                      : paths.common.login;
                  window.location.replace(redirectUrl);
                }
              })
              .catch(() => {
                requestsToRefresh.forEach(cb => cb(false));
              })
              .finally(() => {
                requestsToRefresh = [];
                isRefreshRequesting = false;
              });
          }

          return new Promise((resolve, reject) => {
            requestsToRefresh.push(hasToken => {
              if (hasToken) {
                resolve(axios(config));
              } else {
                reject(Promise.reject(err));
              }
            });
          });
        }

        return Promise.reject(err);
      },
    );
  }
};
