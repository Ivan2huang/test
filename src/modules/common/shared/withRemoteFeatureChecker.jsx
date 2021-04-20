import React, { useEffect, useState } from 'react';
import { getRemoteFeatureChecker } from '../../../helpers/firebase';
import CONFIG from '../../../constants/config';

const withRemoteFeatureChecker = WrappedComponent => {
  return props => {
    const [loaded, setLoaded] = useState(false);
    const [isFeatureEnabled, setIsFeatureEnabled] = useState(() => () => true);

    useEffect(() => {
      if (CONFIG.enableFeatureToggle) {
        const getChecker = async () => {
          const checker = await getRemoteFeatureChecker({
            parameterName: CONFIG.featureToggleKey,
          });
          setIsFeatureEnabled(() => checker);
          setLoaded(true);
        };

        getChecker();
      } else {
        setLoaded(true);
      }
    }, []);

    return (
      loaded && (
        <WrappedComponent {...props} isFeatureEnabled={isFeatureEnabled} />
      )
    );
  };
};

export default withRemoteFeatureChecker;
