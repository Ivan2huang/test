import React from 'react';

const ResultData = () => <></>;
const appPaths = process.env.IOS_APP_PATHS || '/verify';
const appPathArray = appPaths.split(',');

ResultData.getInitialProps = async ({ res }) => {
  res.status(200).json({
    applinks: {
      apps: [],
      details: [
        {
          appID: process.env.IOS_APP_ID || '',
          paths: appPathArray,
        },
      ],
    },
  });
};

export default ResultData;
