import React from 'react';

const ResultData = () => <></>;

ResultData.getInitialProps = async ({ res }) => {
  res.status(200).json([
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: process.env.ANDROID_PACKAGE_NAME || '',
        sha256_cert_fingerprints:
          process.env.ANDROID_SHA256_CERT_FINGERPRINTS.split('|') || [],
      },
    },
  ]);
};

export default ResultData;
