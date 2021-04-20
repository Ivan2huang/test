import React from 'react';
import * as PropTypes from 'prop-types';
import { Chart, Bar } from 'react-chartjs-2';
import moment from 'moment';
import { withTheme, withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { injectIntl } from 'react-intl';
import { formatDate } from '../../../helpers/helpers';
import CONFIG from '../../../constants/config';

const MAX_CHART_DATA_LENGTH = 6;

const localeFormatterMap = {
  'en-HK': CONFIG.monthDayCustomEnglishFormat,
  'zh-HK': CONFIG.monthDayCustomChineseFormat,
};

Chart.pluginService.register({
  beforeRender(chart) {
    if (chart.config.options.showAllTooltips) {
      chart.pluginTooltips = [];
      chart.config.data.datasets.forEach(function dataSets(dataset, i) {
        chart.getDatasetMeta(i).data.forEach(function dataSetsMeta(sector) {
          chart.pluginTooltips.push(
            new Chart.Tooltip(
              {
                _chart: chart.chart,
                _chartInstance: chart,
                _data: chart.data,
                _options: chart.options.tooltips,
                _active: [sector],
              },
              chart,
            ),
          );
        });
      });

      chart.options.tooltips.enabled = false;
    }
  },
  afterDraw(chart, easing) {
    if (chart.config.options.showAllTooltips) {
      if (!chart.allTooltipsOnce) {
        if (easing !== 1) return;
        chart.allTooltipsOnce = true;
      }

      chart.options.tooltips.enabled = true;
      Chart.helpers.each(chart.pluginTooltips, function helper(tooltip) {
        tooltip.initialize();
        tooltip.update();
        tooltip.pivot();
        tooltip.transition(easing).draw();
      });
      chart.options.tooltips.enabled = false;
    }
  },
});

export const callbacks = {
  title() {},
  label(toolTipItem) {
    return toolTipItem.value;
  },
};

const getOptions = theme => ({
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false,
  },
  layout: {
    padding: {
      top: 40,
    },
  },
  tooltips: {
    callbacks,
    yAlign: 'bottom',
    xAlign: 'center',
    cornerRadius: 0,
    xPadding: theme.spacing(4),
    yPadding: theme.spacing(0),
    backgroundColor: 'rgba(0, 0, 0, 0)',
    bodyFontColor: theme.black,
    displayColors: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: { display: false, offsetGridLines: false },
        barThickness: theme.spacing(1),
      },
    ],
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
          stepSize: 25,
          padding: 10,
        },
        gridLines: {
          drawBorder: false,
        },
      },
    ],
  },
  showAllTooltips: true,
});

const transformData = (data, theme, locale) => {
  const labels = [];
  const scores = [];
  data.forEach(item => {
    labels.push(
      formatDate(
        item.createdOn,
        locale,
        localeFormatterMap[locale] || CONFIG.monthDayCustomEnglishFormat,
      ),
    );
    scores.push(item.score);
  });
  // eslint-disable-next-line no-plusplus
  for (let count = data.length; count < MAX_CHART_DATA_LENGTH; count++) {
    labels.push('');
    scores.push(0);
  }
  return {
    labels,
    datasets: [
      {
        backgroundColor: theme.lowEmphasis,
        borderColor: theme.lowEmphasis,
        borderWidth: 1,
        hoverBackgroundColor: theme.black,
        hoverBorderColor: theme.black,
        data: scores,
      },
    ],
  };
};

const styles = () => ({
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  },
});

const BarChart = ({ classes, intl, data, theme }) => {
  return (
    <Box height="194px">
      <Bar
        data={transformData(data, theme, intl.locale)}
        options={getOptions(theme)}
      />
      <table id="myHistoryScore" className={classes.srOnly}>
        <tbody>
          {data.map(scoreItem => {
            return (
              <tr key={scoreItem.createdOn}>
                <td>
                  {formatDate(
                    scoreItem.createdOn,
                    intl.locale,
                    localeFormatterMap[intl.locale] ||
                      CONFIG.monthDayCustomEnglishFormat,
                  )}
                </td>
                <td>{scoreItem.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};

BarChart.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
      createdOn: PropTypes.string.isRequired,
    }),
  ).isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default withTheme(withStyles(styles)(injectIntl(BarChart)));
