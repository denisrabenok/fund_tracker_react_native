/** @format */

// noinspection JSUnresolvedVariable
import React from "react";
import { View, Alert, Image, Dimensions, TouchableOpacity, Text, Platform } from "react-native";
import { connect } from "react-redux";
import person_placeholder from "../assets/person_placeholder.jpg"
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon_Fontisto from 'react-native-vector-icons/Fontisto'
import Icon_MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from "../resources/colors";
import dimens from "../resources/dimens";
const { width, height } = Dimensions.get('window');
class SideBar extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={person_placeholder}
          style={{
            width: width / 4,
            height: width / 4,
            resizeMode: 'cover',
            borderRadius: width / 8,
            marginTop: Platform.OS === 'ios' ? 50 : 20,
            borderWidth: 2,
            borderColor: colors.secondaryColor
          }} />
        <View
          style={{
            width: '80%',
            marginTop: 30
          }}>
          <TouchableOpacity activeOpacity={0.7}
            style={sideBarStyles.itemContainer}
            onPress={() => { this.props.navigation.closeDrawer() }}>
            <Icon_FontAwesome name={"dashboard"}
              style={sideBarStyles.itemIcon} />
            <Text
              style={sideBarStyles.itemText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}
            style={sideBarStyles.itemContainer}
            onPress={() => {
              this.props.navigation.closeDrawer();
            }}>
            <Icon_Fontisto name={"person"}
              style={sideBarStyles.itemIcon} />
            <Text
              style={sideBarStyles.itemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}
            style={sideBarStyles.itemContainer}
            onPress={() => {
              this.props.navigation.closeDrawer();
              this.props.navigation.navigate("Login")
            }}>
            <Icon_MaterialCommunityIcons name={"logout"}
              style={sideBarStyles.itemIcon} />
            <Text
              style={sideBarStyles.itemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const sideBarStyles = {
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.weakColor,
    borderBottomWidth: 2,
    paddingBottom: 3,
    marginTop: 10
  },
  itemIcon: {
    width: 30,
    fontSize: dimens.font_size_extra_large,
    color: colors.primaryColor
  },
  itemText: {
    marginLeft: 10,
    fontSize: dimens.font_size_medium,
    color: colors.primaryColor,
    fontWeight: 'bold'
  }
}

const mapStateToProps = (state) => ({
  dashboard: state.get("dashboard")
});

export default connect(mapStateToProps)(SideBar)
