import ViewModel from './src/supabase/ViewModel';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AppNavigator from './src/screens/AppNavigator';
import { useFonts } from 'expo-font';

export default function App() {

  let [fontsLoaded] = useFonts({
    'BebasBold': require('./assets/fonts/BebasBold.otf'),
    'BebasReg': require('./assets/fonts/BebasReg.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ViewModel>
      <NavigationContainer theme={DarkTheme}>
        <AppNavigator />
      </NavigationContainer>
    </ViewModel>
  );
}
