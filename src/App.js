import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Navigation from "./pages/Navigation.js";
import SplashScreen from 'react-native-smart-splash-screen'
const store = configureStore();

console.ignoredYellowBox = ['Warning:'];
console.disableYellowBox = true;
export default class App extends Component {
  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 3000,
    })
  }
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}