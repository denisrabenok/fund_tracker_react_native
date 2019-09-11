import React, { Component } from "react";
import { Alert, StatusBar, Dimensions, View, Image, Text, TouchableOpacity, Platform } from "react-native";
import { Container, Footer, Content, FooterTab } from "native-base"
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon_Foundation from 'react-native-vector-icons/Foundation'
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon_Feather from 'react-native-vector-icons/Feather'
import { OffCanvas3D } from 'react-native-off-canvas-menu'
import { connect } from "react-redux";
import colors from "../../resources/colors";
import dimens from "../../resources/dimens";
import strings from "../../resources/strings";
import styles from "../../resources/styles";
import * as dashboardActions from "../../actions/dashboard-actions";
import * as rootActions from "../../actions/root-actions";
import footer_home_icon from '../../assets/icons/footer_home_icon.png'
import footer_products_icon from '../../assets/icons/footer_products_icon.png'
import footer_trades_icon from '../../assets/icons/footer_trades_icon.png'
import footer_reports_icon from '../../assets/icons/footer_reports_icon.png'
import footer_settings_icon from '../../assets/icons/footer_settings_icon.png'
import right_direction_icon from '../../assets/icons/right_direction_icon.png'

import Home_Panel from './Home_Panel'
import Products_Panel from './Products/Products_Panel'
import Product_detail from './Products/Product_detail'
import { Search_Setting } from "./Products/Search_Setting";
import { throwStatement } from "@babel/types";

const { width, height } = Dimensions.get('window');
export class Dashboard extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            headerTitleStyle: { color: 'white' },
            title: navigation.getParam('activeIndex') == 6 ? strings.PRODUCT_DETAIL : navigation.getParam('activeIndex') == 7 ? strings.SEARCH_PRODUCT : strings.FUND_TRACKER,
            headerStyle: {
                backgroundColor: colors.navBarColor
            },
            headerLeft: (
                <TouchableOpacity activeOpacity={0.9} onPress={navigation.getParam('handleMenu')} style={{ marginLeft: 10 }}>
                    <Icon
                        name={navigation.getParam('activeIndex') == 6 || navigation.getParam('activeIndex') == 7 ? 'chevron-left' : 'navicon'}
                        style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: 'white'
                        }} />
                </TouchableOpacity>
            ),
            headerRight: (
                navigation.getParam('activeIndex') == 2 || navigation.getParam('activeIndex') == 6 || navigation.getParam('activeIndex') == 7 ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.9} style={{ marginRight: 10 }} onPress={navigation.getParam('handleShowMode')}>
                            <Icon_Foundation
                                name={navigation.getParam('show_expand') ? 'list-bullet' : 'list'}
                                style={{
                                    fontSize: 30,
                                    color: 'white'
                                }} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ marginRight: 10 }} onPress={navigation.getParam("goToSearchSetting")}>
                            <Icon
                                name={'search'}
                                style={{
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    color: 'white'
                                }} />
                        </TouchableOpacity>
                    </View>
                    : null
            )
        }
    }

    constructor() {
        super();
        this.state = {
            activeIndex: 1,
            isMenuOpen: false,
            isSortPopupOpen: false,
            display_mode: 1,
            show_expand: true
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            handleMenu: this._handleMenu,
            handleSortPopup: this._handleSortPopup,
            handleShowMode: this._handleShowMode,
            goToSearchSetting: this._goToSearchSetting,
            activeIndex: this.state.activeIndex,
            show_expand: this.state.show_expand
        });
    }


    componentDidMount() {
        this.props.dispatch(rootActions.setLoading(true))
        this.props.dispatch(dashboardActions.getProductCount());
    }

    componentDidUpdate() {

    }
    _goToSearchSetting = () => {
        if (this.state.isSortPopupOpen)
            return;
        this.props.navigation.setParams({
            activeIndex: 7
        });
        this.setState({ activeIndex: 7 })
    }
    _handleShowMode = () => {
        if (this.state.isSortPopupOpen)
            return;
        const { show_expand } = this.state
        this.props.navigation.setParams({
            show_expand: !show_expand
        });
        this.setState({
            show_expand: !show_expand
        });
    }

    _handleMenu = () => {
        if (this.state.isSortPopupOpen)
            return;
        else {
            if (this.state.activeIndex == 6 || this.state.activeIndex == 7) {
                // alert("back button")
                this.props.navigation.setParams({
                    activeIndex: 2
                });
                this.setState({ activeIndex: 2 })
            }
            else {
                // alert("menu button")
                const { isMenuOpen } = this.state
                this.setState({
                    isMenuOpen: !isMenuOpen
                })
            }
        }
    }

    _handleSortPopup = () => {
        if (this.state.activeIndex == 2) {
            this.setState({ isSortPopupOpen: true });
        }
    }

    _goToProductDetailPage = (item) => {
        // alert(item);
        this.props.navigation.setParams({
            activeIndex: 6,
            product: item
        });
        this.setState({ activeIndex: 6 })
    }

    getPanel() {
        switch (this.state.activeIndex) {
            case 1: // home page 
                return (<Home_Panel
                    navigation={this.props.navigation}
                    goToProductsPage={() => this.onPressFooterTab(2)}
                    goToProductDetailPage={this._goToProductDetailPage} />);
            case 2: // products page
                return (<Products_Panel
                    display_mode={this.state.display_mode}
                    navigation={this.props.navigation}
                    show_expand={this.state.show_expand}
                    goToProductDetailPage={this._goToProductDetailPage} />);
            case 6: // product detail page
                return (<Product_detail navigation={this.props.navigation} />); Product_detail
            case 7: // product detail page
                return (<Search_Setting navigation={this.props.navigation} />); Product_detail
            default:
                return (<Home_Panel />);
        }
    }

    onPressFooterTab = (index) => {
        this.setState({ activeIndex: index });
        this.props.navigation.setParams({
            activeIndex: index
        });
    }

    render() {
        return (
            <Container style={{ backgroundColor: colors.containerColor }}>
                <StatusBar backgroundColor={colors.navBarColor} barStyle="dark" />

                <Content style={dashboardStyles.containerStyle} contentContainerStyle={{ flex: 1 }}>
                    {this.getPanel()}
                </Content>
                <Footer style={dashboardStyles.footerContainerStyle}>
                    <FooterTab style={dashboardStyles.footerTabStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={dashboardStyles.footerItem}
                            onPress={() => { this.onPressFooterTab(1) }}>
                            <Image source={footer_home_icon}
                                style={[dashboardStyles.footeritemImg,
                                this.state.activeIndex == 1 ? { tintColor: colors.primaryColor } : null]} />
                            <Text style={[dashboardStyles.footerItemText, this.state.activeIndex == 1 ? { color: colors.primaryColor } : null]}>{strings.HOME}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={dashboardStyles.footerItem}
                            onPress={() => { this.onPressFooterTab(2) }}>
                            <Image source={footer_products_icon}
                                style={[dashboardStyles.footeritemImg,
                                this.state.activeIndex == 2 || this.state.activeIndex == 6 || this.state.activeIndex == 7 ? { tintColor: colors.primaryColor } : null]} />
                            <Text style={[dashboardStyles.footerItemText, this.state.activeIndex == 2 || this.state.activeIndex == 6 || this.state.activeIndex == 7 ? { color: colors.primaryColor } : null]}>{strings.PRODUCTS}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={dashboardStyles.footerItem}
                            onPress={() => { this.onPressFooterTab(3) }}>
                            <Image source={footer_trades_icon}
                                style={[dashboardStyles.footeritemImg,
                                this.state.activeIndex == 3 ? { tintColor: colors.primaryColor } : null]} />
                            <Text style={[dashboardStyles.footerItemText, this.state.activeIndex == 3 ? { color: colors.primaryColor } : null]}>{strings.TRADES}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={dashboardStyles.footerItem}
                            onPress={() => { this.onPressFooterTab(4) }}>
                            <Image source={footer_reports_icon}
                                style={[dashboardStyles.footeritemImg,
                                this.state.activeIndex == 4 ? { tintColor: colors.primaryColor } : null]} />
                            <Text style={[dashboardStyles.footerItemText, this.state.activeIndex == 4 ? { color: colors.primaryColor } : null]}>{strings.REPORTS}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={dashboardStyles.footerItem}
                            onPress={() => { this.onPressFooterTab(5) }}>
                            <Image source={footer_settings_icon}
                                style={[dashboardStyles.footeritemImg,
                                this.state.activeIndex == 5 ? { tintColor: colors.primaryColor } : null]} />
                            <Text style={[dashboardStyles.footerItemText, this.state.activeIndex == 5 ? { color: colors.primaryColor } : null]}>{strings.SETTINGS}</Text>
                        </TouchableOpacity>
                    </FooterTab>
                </Footer>
                {this.state.isSortPopupOpen ?
                    <TouchableOpacity activeOpacity={1} onPress={() => { }}
                        style={{
                            zIndex: 999,
                            elevation: (Platform.OS === 'android') ? width : 0,
                            backgroundColor: '#000000aa',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            justifyContent: 'flex-end'
                        }}>
                        <View style={{
                            width: '90%',
                            backgroundColor: 'white',
                            alignSelf: 'center',
                            padding: 20,
                            marginBottom: width / 20,
                            paddingTop: 40,
                            paddingBottom: 40,
                            borderRadius: 5,
                            borderColor: colors.primaryColor,
                            borderWidth: 2
                        }}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => { this.setState({ isSortPopupOpen: false }) }}
                                style={{
                                    backgroundColor: colors.primaryColor,
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: -3,
                                    right: -3
                                }}>
                                <Icon name='close' style={{
                                    color: 'white',
                                    fontSize: dimens.font_size_small
                                }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => this.setState({ display_mode: 1, isSortPopupOpen: false })}
                                style={{
                                    backgroundColor: colors.primaryColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                <Text style={{ color: 'white', fontSize: dimens.font_size_medium }}>{strings.ALL_PRODUCTS}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => this.setState({ display_mode: 2, isSortPopupOpen: false })}
                                style={{
                                    marginTop: 20,
                                    backgroundColor: colors.primaryColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                <Text style={{ color: 'white', fontSize: dimens.font_size_medium }}>{strings.HIGH_RISK_PRODUCTS}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => this.setState({ display_mode: 3, isSortPopupOpen: false })}
                                style={{
                                    marginTop: 20,
                                    backgroundColor: colors.primaryColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                <Text style={{ color: 'white', fontSize: dimens.font_size_medium }}>{strings.LOW_RISK_PRODUCTS}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    : null}
            </Container>
        );
    }
}
const dashboardStyles = {
    containerStyle: {
        flex: 1,
        width: "100%",
        paddingLeft: 5,
        paddingRight: 5
    },
    footerContainerStyle: {
        zIndex: 99,
        backgroundColor: colors.navBarColor,
        paddingLeft: 10,
        paddingRight: 10
    },
    footerTabStyle: {
        zIndex: 90,
        backgroundColor: colors.navBarColor
    },
    footerItem: {
        zIndex: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footeritemImg: {
        tintColor: 'white',
        width: width / 20,
        height: width / 20,
        resizeMode: 'contain'
    },
    footerItemText: {
        color: 'white',
    }
};

const mapStateToProps = (state) => ({
    dashboard: state.get("dashboard")
});

export default connect(mapStateToProps)(Dashboard)