import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { accentColor } from '../../constants/constants';
import IconSmall from '../Icons/IconSmall';

const BackButton = () => {

    return (
        <IconSmall name={'chevron-back-sharp'} color={'white'} backgroundColor={accentColor} />
    );
    
};

export default BackButton; 