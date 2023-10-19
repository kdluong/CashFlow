import { scale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    logo: {
        fontFamily: 'BebasBold',
        fontSize: scale(50),
        color: 'white',
    },
    header: (color) => {
        return {
            fontFamily: 'BebasBold',
            fontSize: scale(18),
            color: color,
        }
    },
    subHeader: (color) => {
        return {
            fontFamily: 'BebasBold',
            fontSize: scale(16),
            color: color,
        }
    },
    body: (color) => {
        return {
            fontFamily: 'BebasReg',
            fontSize: scale(14),
            color: color,
        }
    }
});