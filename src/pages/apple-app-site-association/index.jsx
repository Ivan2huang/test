import React from 'react';

const ResultData = () => <></>;

ResultData.getInitialProps = async ({ res }) => {
  res.status(200).json({
    applinks: {
      apps: [],
      details: [
        {
          appID: process.env.IOS_APP_ID || '',
          paths: ['/verify'],
        },
      ],
    },
  });
};

export default ResultData;
