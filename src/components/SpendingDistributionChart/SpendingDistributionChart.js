import React from 'react';
import { View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import { PieChart } from 'react-native-gifted-charts';
import { accentColor } from '../../constants/constants';
import globalStyles from '../../styles/styles.ts';

function SpendingDistributionChart({ categories, total }) {
  const copiedArray = [...categories];

  const renderCenterComponent = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'BebasReg', fontSize: scale(15), color: 'white' }}>$</Text>
      <Text style={{ ...globalStyles.subHeader('white') }} numberOfLines={1}>
        {total}
      </Text>
    </View>
  );

  return (
    <View
      style={{
        gap: scale(15),
        width: '48%',
        alignItems: 'center',
        backgroundColor: accentColor,
        padding: scale(15),
        borderRadius: scale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      }}
    >
      <Text style={{ ...globalStyles.subHeader('white') }}>Spending Distribution</Text>

      <PieChart
        data={total === '0.00' ? [{ value: 1, color: 'white' }] : copiedArray}
        radius={scale(60)}
        innerRadius={scale(42)}
        strokeWidth={scale(1)}
        strokeColor={accentColor}
        innerCircleColor={accentColor}
        centerLabelComponent={renderCenterComponent}
      />
    </View>
  );
}

export default SpendingDistributionChart;
