import { TextStyle } from 'react-native';
import { scale } from 'react-native-size-matters';

interface GlobalStyles {
  logo: TextStyle;
  header: (color: string) => TextStyle;
  subHeader: (color: string) => TextStyle;
  body: (color: string) => TextStyle;
}

const globalStyles: GlobalStyles = {
  logo: {
    fontFamily: 'BebasBold',
    fontSize: scale(50),
    color: 'white',
  },
  header: (color) => ({
    fontFamily: 'BebasBold',
    fontSize: scale(18),
    color: color,
  }),
  subHeader: (color) => ({
    fontFamily: 'BebasBold',
    fontSize: scale(16),
    color: color,
  }),
  body: (color) => ({
    fontFamily: 'BebasReg',
    fontSize: scale(14),
    color: color,
  }),
};

export default globalStyles;