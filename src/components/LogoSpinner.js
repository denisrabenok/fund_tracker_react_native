/** @format */

// noinspection JSUnresolvedVariable
import React from "react";
import { View, Animated, Image, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import logo from '../assets/logo.png'
import colors from "../resources/colors";
const { width, height } = Dimensions.get('window');
class LogoSpinner extends React.Component {
  constructor(props) {
    super(props);

    this.animateValue = new Animated.Value(0);
    this.animatedStyle = {
      transform: [
        {
          rotate: this.animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"],
          }),
        },
      ],
    };

    this.doAnimation = this.doAnimation.bind(this);
  }

  componentDidMount() {
    this.doAnimation();
  }

  doAnimation() {
    this.animateValue.setValue(0);
    Animated.sequence([
      Animated.timing(this.animateValue, {
        toValue: 6,
        duration: 3000,
        friction: 0.5,
      }),
    ]).start(() => this.doAnimation());
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          marginTop: 100,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Animated.View style={this.animatedStyle}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "transparent",
    height: null,
    width: null,
  },
  container_full_stretch: {
    height: null,
    width: null,
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 50,
    width: 50,
  },
};


const mapStateToProps = (state) => ({
  dashboard: state.get("dashboard")
});

export default connect(mapStateToProps)(LogoSpinner)
