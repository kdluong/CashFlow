import React from 'react';
import { Text, View } from 'react-native';
import globalStyles from '../../styles/styles.ts';
import { monthNames, monthNamesShort } from '../../constants/constants';

function MonthlyOverview({
  transactions, currentMonth, currentTotal, chartData,
}) {
  if (transactions !== undefined && transactions?.length !== 0) {
    let month;
    let total;

    if (currentMonth == null && currentTotal == null) {
      if (transactions?.length !== 0) {
        const index = monthNamesShort.indexOf(chartData?.at(-1)?.label);

        month = monthNames[index];
        total = chartData?.at(-1)?.value;
      }
    } else {
      month = currentMonth;
      total = currentTotal;
    }

    return (
      <Text style={globalStyles.body('black')}>
        {month}
        {' '}
        $
        {parseFloat(total).toFixed(2)}
      </Text>
    );
  }
  return <View />;
}

export default MonthlyOverview;
