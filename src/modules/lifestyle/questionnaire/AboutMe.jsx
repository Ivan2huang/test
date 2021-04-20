import React from 'react';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import Typography from '../../../uiComponents/Typography';
import Images from '../../../constants/images';
import renderNumberInput from '../../../utils/renderNumberInput';
import renderDropdown from '../../../utils/renderDropdown';
import renderCheckbox from '../../../utils/renderCheckbox';
import { formatMessage } from '../../../helpers/helpers';
import { BMI_UNIT } from './constants';

const {
  height: { CM, IN, FTIN },
  weight: { KG, LB },
} = BMI_UNIT;

const intConfig = {
  maxLength: 3,
  decimalScale: 0,
};

const decimalConfig = {
  maxLength: 20,
  decimalScale: 2,
};
const inputConfigs = {
  [undefined]: intConfig,
  [CM]: intConfig,
  [FTIN]: intConfig,
  [IN]: decimalConfig,
  [KG]: intConfig,
  [LB]: decimalConfig,
};

const AboutMe = ({ intl, data, fieldChange }) => {
  const { heightUnit = CM, weightUnit = KG, waistUnit = CM } = data;

  const clearHeight = () => {
    fieldChange('aboutMe.heightOne', '');
    fieldChange('aboutMe.heightTwo', '');
  };
  const clearWeight = () => {
    fieldChange('aboutMe.weight', '');
  };
  const clearWaistCircumference = () => {
    fieldChange('aboutMe.waistCircumference', '');
  };

  const isCmHeight = heightUnit === CM;
  const heightLabel = isCmHeight
    ? formatMessage(intl, 'lifestyle.questionnaire.aboutMe.unit.cm', 'CM')
    : formatMessage(intl, 'lifestyle.questionnaire.aboutMe.unit.ft', 'FT');
  const weightLabel =
    weightUnit === KG
      ? formatMessage(intl, 'lifestyle.questionnaire.aboutMe.unit.kg', 'KG')
      : formatMessage(intl, 'lifestyle.questionnaire.aboutMe.unit.lb', 'LB');
  const waistLabel =
    waistUnit === IN
      ? formatMessage(intl, 'lifestyle.questionnaire.aboutMe.unit.in', 'IN')
      : formatMessage(intl, 'lifestyle.questionnaire.aboutMe.unit.cm', 'CM');

  const heightOnColumns = isCmHeight ? { xs: 12, md: 12 } : { xs: 12, md: 6 };

  return (
    <Box mt={{ md: 20 }} mb={12}>
      <Grid>
        <GridItem offset={{ md: 1 }} columns={{ md: 3 }}>
          <img src={Images.LIFESTYLE_QUESTIONNAIRE_ABOUT_ME} alt="" />
        </GridItem>
        <GridItem columns={{ xs: 12, md: 8 }}>
          <Box mb={10}>
            <Typography type="style-1">
              {formatMessage(
                intl,
                'lifestyle.questionnaire.aboutMe.header',
                'About me',
              )}
            </Typography>
          </Box>
          <Grid>
            <GridItem columns={{ xs: 12, md: 6 }}>
              <span data-id="heightOne" />
              <span data-id="heightTwo" />
              <Grid>
                <GridItem columns={{ xs: 12, md: 12 }}>
                  <Typography type="style-6">
                    {formatMessage(
                      intl,
                      'lifestyle.questionnaire.aboutMe.height.label',
                      'Height',
                    )}
                  </Typography>
                </GridItem>
                <GridItem columns={{ xs: 12, md: 7 }}>
                  <Grid>
                    <GridItem columns={heightOnColumns}>
                      <Field
                        name="heightOne"
                        testId="input-height-one"
                        {...inputConfigs[heightUnit]}
                        component={renderNumberInput}
                        label={heightLabel}
                        errorMessage={formatMessage(
                          intl,
                          'lifestyle.questionnaire.aboutMe.height.error',
                          'Enter a valid height',
                        )}
                      />
                    </GridItem>
                    {!isCmHeight && (
                      <GridItem columns={{ xs: 12, md: 6 }}>
                        <Field
                          name="heightTwo"
                          testId="input-height-two"
                          {...inputConfigs[IN]}
                          component={renderNumberInput}
                          label={formatMessage(
                            intl,
                            'lifestyle.questionnaire.aboutMe.unit.in',
                            'IN',
                          )}
                          errorMessage={formatMessage(
                            intl,
                            'lifestyle.questionnaire.aboutMe.height.error',
                            'Enter a valid height',
                          )}
                        />
                      </GridItem>
                    )}
                  </Grid>
                </GridItem>
                <GridItem columns={{ xs: 12, md: 4 }}>
                  <Field
                    name="heightUnit"
                    testId="dropdown-height-unit"
                    items={[
                      {
                        label: formatMessage(
                          intl,
                          'lifestyle.questionnaire.aboutMe.unit.cm',
                          'CM',
                        ),
                        value: CM,
                      },
                      {
                        label: formatMessage(
                          intl,
                          'lifestyle.questionnaire.aboutMe.unit.ftin',
                          'FT, IN',
                        ),
                        value: FTIN,
                      },
                    ]}
                    displayProperty="label"
                    valueProperty="value"
                    errorMessage={formatMessage(
                      intl,
                      'lifestyle.questionnaire.question.error',
                      'Select an answer',
                    )}
                    onChange={clearHeight}
                    component={renderDropdown}
                  />
                </GridItem>
              </Grid>
              <span data-id="weight" />
              <Grid>
                <GridItem columns={{ xs: 12, md: 12 }}>
                  <Typography type="style-6">
                    {formatMessage(
                      intl,
                      'lifestyle.questionnaire.aboutMe.weight.label',
                      'Weight',
                    )}
                  </Typography>
                </GridItem>
                <GridItem columns={{ xs: 12, md: 7 }}>
                  <Field
                    name="weight"
                    testId="input-weight"
                    {...inputConfigs[weightUnit]}
                    component={renderNumberInput}
                    label={weightLabel}
                    errorMessage={formatMessage(
                      intl,
                      'lifestyle.questionnaire.aboutMe.weight.error',
                      'Enter a valid weight',
                    )}
                  />
                </GridItem>
                <GridItem columns={{ xs: 12, md: 4 }}>
                  <Field
                    name="weightUnit"
                    testId="dropdown-weight-unit"
                    items={[
                      {
                        label: formatMessage(
                          intl,
                          'lifestyle.questionnaire.aboutMe.unit.kg',
                          'KG',
                        ),
                        value: KG,
                      },
                      {
                        label: formatMessage(
                          intl,
                          'lifestyle.questionnaire.aboutMe.unit.lb',
                          'LB',
                        ),
                        value: LB,
                      },
                    ]}
                    displayProperty="label"
                    valueProperty="value"
                    errorMessage={formatMessage(
                      intl,
                      'lifestyle.questionnaire.question.error',
                      'Select an answer',
                    )}
                    onChange={clearWeight}
                    component={renderDropdown}
                  />
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem columns={{ xs: 12, md: 6 }}>
              <span data-id="waistCircumference" />
              <Grid>
                <GridItem columns={{ xs: 12, md: 12 }}>
                  <Typography type="style-6">
                    {formatMessage(
                      intl,
                      'lifestyle.questionnaire.aboutMe.waistCircumference.label',
                      'Waist circumference',
                    )}
                  </Typography>
                </GridItem>
                <GridItem columns={{ xs: 12, md: 7 }}>
                  <Field
                    name="waistCircumference"
                    testId="input-waist-circumference"
                    helperText={formatMessage(
                      intl,
                      'lifestyle.questionnaire.aboutMe.optional',
                      'Optional',
                    )}
                    {...inputConfigs[waistUnit]}
                    component={renderNumberInput}
                    label={waistLabel}
                    errorMessage={formatMessage(
                      intl,
                      'lifestyle.questionnaire.aboutMe.waistCircumference.error',
                      'Enter a valid waist circumference',
                    )}
                  />
                </GridItem>
                <GridItem columns={{ xs: 12, md: 4 }}>
                  <Field
                    name="waistUnit"
                    testId="dropdown-waist-circumfercence-unit"
                    items={[
                      {
                        label: formatMessage(
                          intl,
                          'lifestyle.questionnaire.aboutMe.unit.cm',
                          'CM',
                        ),
                        value: CM,
                      },
                      {
                        label: formatMessage(
                          intl,
                          'lifestyle.questionnaire.aboutMe.unit.in',
                          'IN',
                        ),
                        value: IN,
                      },
                    ]}
                    displayProperty="label"
                    valueProperty="value"
                    errorMessage={formatMessage(
                      intl,
                      'lifestyle.questionnaire.question.error',
                      'Select an answer',
                    )}
                    onChange={clearWaistCircumference}
                    component={renderDropdown}
                  />
                </GridItem>
              </Grid>
              <Field
                name="isAsian"
                testId="input-asian"
                component={renderCheckbox}
                label={formatMessage(
                  intl,
                  'lifestyle.questionnaire.aboutMe.ethnicity.label',
                  'I am Asian',
                )}
              />
              <Typography type="style-8" color="highEmphasis">
                {formatMessage(
                  intl,
                  'lifestyle.questionnaire.aboutMe.ethnicity.hint.header',
                  'Did you know?',
                )}
              </Typography>
              <Typography type="style-8">
                {formatMessage(
                  intl,
                  'lifestyle.questionnaire.aboutMe.ethnicity.hint.description',
                  'The classification based on BMI would be different for Asian and non-Asian races. Research shows that Asians have more than double the risk of developing type 2 diabetes than Caucasians.',
                )}
              </Typography>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

AboutMe.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}),
  fieldChange: PropTypes.func.isRequired,
};

AboutMe.defaultProps = {
  data: {},
};

export default injectIntl(AboutMe);
