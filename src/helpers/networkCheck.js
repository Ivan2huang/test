const checkNetworkConnectivity = () => {
  if (!window.navigator.onLine) {
    throw new Error('No internet connection');
  }
};

export default checkNetworkConnectivity;
