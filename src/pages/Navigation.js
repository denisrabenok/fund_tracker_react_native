import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { Text } from "react-native"
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import Icon_Foundation from 'react-native-vector-icons/Foundation';
import Icon_FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon_MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon_MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import configureStore from "../store/configureStore.js";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import strings from "../resources/strings";
import Dashboard from "./Dashboard/Dashboard";

import Products_Panel from "./Dashboard/Products/Products_Panel"
import Product_detail from "./Dashboard/Products/Product_detail"
import Search_Setting from "./Dashboard/Products/Search_Setting"
import Home_Panel from "./Dashboard/Home_Panel";
import dimens from "../resources/dimens.js";
import colors from "../resources/colors.js";
import { fromLeft, zoomIn, zoomOut, fadeIn, flipY } from 'react-navigation-transitions'

const store = configureStore();
const Routes = {
  Dashboard: { screen: Dashboard }
};

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  // if (prevScene
  //   && prevScene.route.routeName === 'Products_Panel'
  //   && nextScene.route.routeName === 'Product_detail' ||
  //   prevScene && prevScene.route.routeName === 'Products_Panel'
  //   && nextScene.route.routeName === 'Search_Setting') {
  //   return zoomIn();
  // } else if (prevScene
  //   && prevScene.route.routeName === 'Product_detail'
  //   && nextScene.route.routeName === 'Products_Panel' ||
  //   prevScene
  //   && prevScene.route.routeName === 'Search_Setting'
  //   && nextScene.route.routeName === 'Products_Panel') {
  //   return zoomOut();
  // }
  return flipY();
}

const ProductsNavigator = createStackNavigator(
  {
    Products_Panel: Products_Panel,
    Product_detail: Product_detail,
    Search_Setting: Search_Setting
  },
  {
    headerMode: 'none',
    navigationOptions: {
      header: null,
      headerVisible: false,
    },
    transitionConfig: (nav) => handleCustomTransition(nav)
  });

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home_Panel,
      navigationOptions: {
        tabBarLabel: strings.HOME,
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon_Entypo name="home" size={horizontal ? 15 : 20} color={tintColor} />
      }
    },
    Products: {
      screen: ProductsNavigator,
      navigationOptions: {
        tabBarLabel: strings.PRODUCTS,
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon_FontAwesome5 name="layer-group" size={horizontal ? 13 : 17} color={tintColor} />
      }
    },
    Trades: {
      screen: Home_Panel,
      navigationOptions: {
        tabBarLabel: strings.TRADES,
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon_MaterialIcons name="pie-chart" size={horizontal ? 15 : 20} color={tintColor} />
      }
    },
    Reports: {
      screen: Home_Panel,
      navigationOptions: {
        tabBarLabel: strings.REPORTS,
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon_Foundation name="video" size={horizontal ? 15 : 20} color={tintColor} />
      }
    },
    Settings: {
      screen: Home_Panel,
      navigationOptions: {
        tabBarLabel: strings.SETTINGS,
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon_MaterialCommunity name="settings" size={horizontal ? 15 : 20} color={tintColor} />
      }
    }
  },
  {
    activeTintColor: colors.primaryColor,
    barStyle: {
      backgroundColor: colors.navBarColor
    },
    shifting: true,
    inactiveTintColor: 'white',
    pressColor: colors.primaryColor,//for click (ripple) effect color
    style: {
      backgroundColor: 'orange',//color you want to change
    },
    headerMode: 'none',
    navigationOptions: {
      header: null,
      headerVisible: false,
    },
    transitionConfig: (nav) => handleCustomTransition(nav),
    tabBarOptions: {
      activeTintColor: colors.primaryColor,
      inactiveTintColor: 'white',
      pressColor: colors.primaryColor,//for click (ripple) effect color
      style: {
        backgroundColor: 'orange',//color you want to change
      }
    }
  });

const InitialNavigator = createStackNavigator(
  {
    // Splash: SplashScreen,
    App: AppNavigator
  }, {
    headerMode: 'none',
    navigationOptions: {
      header: null,
      headerVisible: false,
    },
    transitionConfig: (nav) => handleCustomTransition(nav)
  });

// const Navigator = createStackNavigator(Routes, {
//   headerMode: 'screen',
//   headerLayoutPreset: 'center'
// });

const App = createAppContainer(InitialNavigator);

export class Navigation extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard
  }
}
export default connect(mapStateToProps)(Navigation);
