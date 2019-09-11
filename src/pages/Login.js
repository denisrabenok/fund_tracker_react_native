import React, { Component } from "react";
import { Alert, StatusBar, Dimensions, TextInput, Text, Image, TouchableOpacity } from "react-native";
import { Container, Footer, Content, FooterTab, Header, View } from "native-base"
import Icon_MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon_Zocial from 'react-native-vector-icons/Zocial'
import { connect } from "react-redux";
import colors from "../resources/colors";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import styles from "../resources/styles";
import logo from "../assets/logo.png"
import { StackActions, NavigationActions } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
const { width, height } = Dimensions.get('window');
export class Login extends Component {

    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Container style={{ backgroundColor: colors.navBarColor }}>
                <NavigationEvents onDidFocus={() => this.forceUpdate()} />
                <StatusBar backgroundColor={colors.navBarColor} barStyle="light-content" />
                <Content style={styles.containerStyle}
                    contentContainerStyle=
                    {{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: width
                    }}>
                    <Image source={logo}
                        style={homeStyles.logoImg} />
                    <View style={homeStyles.textInputContainer}>
                        <Icon_Zocial name={"email"}
                            style={homeStyles.textInputIcon} />
                        <TextInput placeholder={"Email"}
                            style={homeStyles.textInput} />
                    </View>
                    <View style={homeStyles.textInputContainer}>
                        <Icon_MaterialCommunityIcons name={"shield-lock"}
                            style={homeStyles.textInputIcon} />
                        <TextInput placeholder={"Password"}
                            secureTextEntry={true}
                            style={homeStyles.textInput} />
                    </View>
                    <TouchableOpacity activeOpacity={0.7}
                        style={homeStyles.loginBtn}
                        onPress={() => { this.props.navigation.navigate("Dashboard") }}>
                        <Text
                            style={homeStyles.loginBtnTxt}>Login</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}
const homeStyles = {
    logoImg: {
        width: width / 3,
        height: width / 3,
        marginBottom: height / 10
    },
    textInputContainer: {
        flexDirection: 'row',
        width: width * 0.8,
        backgroundColor: colors.strongColor,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    textInputIcon: {
        fontSize: dimens.font_size_medium,
        color: "grey"
    },
    textInput: {
        marginLeft: 20,
        fontSize: dimens.font_size_medium,
        color: colors.primaryColor,
        fontWeight: 'bold',
        padding: 0
    },
    loginBtn: {
        marginTop: 30,
        backgroundColor: colors.primaryColor,
        width: width * 0.8,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    loginBtnTxt: {
        color: 'white',
        fontSize: dimens.font_size_large
    }
};

const mapStateToProps = (state) => ({
    dashboard: state.get("dashboard")
});

export default connect(mapStateToProps)(Login)