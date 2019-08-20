import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen';
import Home from './components/Home';
import NumberCode from './components/NumberCode';
import QrCode from './components/QrCode';
import Profile from './components/Profile';

class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;

const BottomTabNavigator = createBottomTabNavigator(
  { 
    HOME: { screen: Home },
    'NUMBER CODE': { screen: NumberCode },
    'QR CODE': { screen: QrCode },
    PROFILE: { screen: Profile }
  },
  {
    tabBarOptions: {
      showLabel: true,
      activeTintColor: '#32A5FF',
      inactiveTintColor: 'dimgray',
      labelStyle: { fontSize: 11, textTransform: 'capitalize' }
    }
  }
);

// BottomTabNavigator.navigationOptions = ({ navigation }) => {
//   const { routeName } = navigation.state.routes[navigation.state.index];
//   const headerTitle = routeName;
//   return {
//     headerTitle,
//     headerTintColor: 'white',
//     headerTitleStyle: { flex: 1, textAlign: 'center' },
//     headerTransparent: true,
//   };
// };

const StackNavigator = createStackNavigator(
  {
    Login: { 
      screen: LoginScreen,
      navigationOptions: () => ({
        header: null,
      })
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: () => ({
        header: null,
      })
    }
  },
);

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: StackNavigator },
  Dashboard: { screen: BottomTabNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);