import { TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OpenDrawerButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons name="reorder-three-outline" size={scale(25)} color={'white'} />
        </TouchableOpacity>
    );
}

export default OpenDrawerButton;