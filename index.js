/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import MainRoutes from './routes';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MainRoutes);
