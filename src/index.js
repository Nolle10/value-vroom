import registerRootComponent from 'expo/build/launch/registerRootComponent';

//Hide warnings
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();

import App from './App';

registerRootComponent(App);
