import React, { Component } from "react";
import { Alert, StatusBar, Dimensions, View, Image, Text, Button, TouchableOpacity, BackAndroid } from "react-native";
import { Container, Footer, Content, FooterTab, Header } from "native-base"
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon_Entypo from 'react-native-vector-icons/Entypo'
import { OffCanvas3D } from 'react-native-off-canvas-menu'
import { connect } from "react-redux";
import colors from "../../resources/colors";
import dimens from "../../resources/dimens";
import strings from "../../resources/strings";
import styles from "../../resources/styles";
import * as dashboardActions from "../../actions/dashboard-actions";
import { StackActions, NavigationActions } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
const { width, height } = Dimensions.get('window');
export class Home_Panel extends Component {

    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentWillMount() {
        // this.props.dispatch(dashboardActions.setShortList([]));
    }

    componentDidMount() {
        this.props.dispatch(dashboardActions.getProductCount());
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    getProducts() {
        if (!this.props.dashboard.get("shortList") || this.props.dashboard.get("shortList") == [])
            return null;

        return this.props.dashboard.get("shortList").map((item, index) => {
            return (
                <TouchableOpacity activeOpacity={0.8}
                    style={homeStyles.productItemContainer}
                    onPress={() => this.props.navigation.navigate("Product_detail", { product: item })}>
                    <Text style={homeStyles.productItemText}>{item.ticker}</Text>
                    <Icon_Entypo name='chevron-right' style={homeStyles.productItemIcon} />
                </TouchableOpacity>
            );
        }
        );
    }
    render() {
        return (
            <Container style={{ backgroundColor: colors.containerColor }}>
                <NavigationEvents onDidFocus={() => this.forceUpdate()} />
                <StatusBar backgroundColor={colors.navBarColor} barStyle="light-content" />
                <Header
                    style={{
                        backgroundColor: colors.navBarColor,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <TouchableOpacity style={styles.headerLeftButton}>
                        <Icon name='navicon' style={styles.headerLeftButtonIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{strings.FUND_TRACKER}</Text>
                </Header>
                <Content style={styles.containerStyle} contentContainerStyle={{ flex: 1 }}>
                    <View style={{ height: '100%', width: '100%' }}>
                        <View style={homeStyles.greetingsContainer}>
                            <Text style={homeStyles.greetingsText}>{strings.GREETINGS} Peter</Text>
                        </View>
                        <View style={homeStyles.productsContainer}>
                            <View style={{
                                backgroundColor: colors.primaryColor,
                                padding: 10
                            }}>
                                <Text style={{ fontSize: dimens.font_size_large, color: 'white' }}>{strings.MY_FAVORITE_PRODUCTS}</Text>
                            </View>
                            {this.getProducts()}
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={homeStyles.moreBtnContainer}
                            onPress={() => this.props.navigation.navigate("Products_Panel")}>
                            <Text style={{ fontSize: dimens.font_size_large, color: 'white' }}>
                                {this.props.dashboard.get("productCount")}
                            </Text>
                            <Text style={{ fontSize: dimens.font_size_small, color: 'white' }}>{strings.PRODUCTS.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}
const homeStyles = {
    greetingsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: 100
    },
    greetingsText: {
        fontSize: dimens.font_size_large,
        color: colors.primaryColor
    },
    productsContainer: {
        width: '100%',
        backgroundColor: 'white'
    },
    productItemContainer: {
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    productItemText: {
        color: colors.primaryColor,
        fontSize: dimens.font_size_medium
    },
    productItemIcon: {
        fontSize: dimens.font_size_medium,
        color: colors.weakColor
    },
    moreBtnContainer: {
        marginTop: 30,
        backgroundColor: colors.primaryColor,
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
};

const mapStateToProps = (state) => ({
    dashboard: state.get("dashboard")
});

export default connect(mapStateToProps)(Home_Panel)