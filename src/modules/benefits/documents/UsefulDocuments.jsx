import React from 'react';
import { injectIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '../../../uiComponents/Typography';
import FileItems from '../../../uiComponents/FileItems';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';

import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';
import downloadFile from '../../../helpers/downloadFile';

const UsefulDocuments = ({ intl, usefulDocuments }) => (
  <>
    <Box>
      <Typography type="style-2">
        {intl.formatMessage({
          id: 'me.tabs.usefulDocuments.title',
          defaultMessage: 'Forms and Documents',
        })}
      </Typography>
    </Box>
    <Grid>
      <GridItem columns={{ xs: 12, md: 8 }}>
        <Box mt={{ xs: -2, md: 0 }}>
          {usefulDocuments.length > 0 && (
            <FileItems
              files={usefulDocuments}
              onClick={file => {
                logAction({
                  category: CATEGORIES.DOCUMENTS_PAGE,
                  action: 'View useful document',
                  document_name: file.name,
                });
                downloadFile(file.url, `${file.name}.${file.contentType}`);
              }}
            />
          )}
        </Box>
      </GridItem>
    </Grid>
  </>
);

UsefulDocuments.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  usefulDocuments: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      contentType: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default injectIntl(UsefulDocuments);
