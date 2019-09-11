import React, { Component } from "react";
import { Alert, TextInput, Dimensions, View, Image, Text, StatusBar, TouchableOpacity, BackAndroid } from "react-native";
import { Container, Footer, Content, FooterTab, Header } from "native-base"
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon_Entypo from 'react-native-vector-icons/Entypo'
import { OffCanvas3D } from 'react-native-off-canvas-menu'
import { connect } from "react-redux";
import colors from "../../../resources/colors";
import dimens from "../../../resources/dimens";
import strings from "../../../resources/strings";
import styles from "../../../resources/styles";
import * as dashboardActions from "../../../actions/dashboard-actions";
import sort_icon from '../../../assets/icons/products_panel_sort_icon.png'
import product_sample from '../../../assets/product_sample.png'

const { width, height } = Dimensions.get('window');
export class Search_Setting extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <Container style={{ backgroundColor: colors.containerColor }}>
                <StatusBar backgroundColor={colors.navBarColor} barStyle="light-content" />
                <Header style={{ backgroundColor: colors.navBarColor, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.headerLeftButton} onPress={() => this.props.navigation.navigate("Products_Panel")}>
                        <Icon_Entypo name='chevron-left' style={styles.headerLeftButtonIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{strings.PRODUCT_DETAIL}</Text>
                </Header>
                <Content style={styles.containerStyle} contentContainerStyle={{ flex: 1 }}>
                    <View style={{ width: '100%' }}>

                        <View style={productDetailStyles.itemContainer}>
                            <Text style={productDetailStyles.itemName}>Asset Class</Text>
                            <Text style={productDetailStyles.itemDesc}>Multiple choice selection or Multiple option tags select</Text>
                        </View>

                        <View style={productDetailStyles.itemContainer}>
                            <Text style={productDetailStyles.itemName}>Category</Text>
                            <Text style={productDetailStyles.itemDesc}>Multiple choice selection or Multiple option tags select</Text>
                        </View>

                        <View style={productDetailStyles.itemContainer}>
                            <Text style={productDetailStyles.itemName}>Product Type</Text>
                            <Text style={productDetailStyles.itemDesc}>Multiple choice selection or Multiple option tags select</Text>
                        </View>
                        <View style={productDetailStyles.switchContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[productDetailStyles.switchItem, { backgroundColor: 'blue' }]}>
                                <Text style={{ color: colors.strongColor, fontSize: dimens.font_size_small }}>{strings.SEARCH}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[productDetailStyles.switchItem, { backgroundColor: colors.strongColor }]}>
                                <Text style={{ color: 'grey', fontSize: dimens.font_size_small }}>{strings.CLEAR}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
const productDetailStyles = {
    titleText: {
        color: colors.secondaryColor,
        fontSize: dimens.font_size_extra_large,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 20
    },
    subTitleText: {
        fontSize: dimens.font_size_small,
        color: colors.secondaryColor,
        paddingHorizontal: 10
    },
    switchContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30
    },
    switchItem: {
        padding: 5,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 20
    },
    itemName: {
        fontSize: dimens.font_size_medium,
        color: colors.secondaryColor
    },
    itemDesc: {
        fontSize: dimens.font_size_small,
        color: 'black'
    },

};

const mapStateToProps = (state) => ({
    dashboard: state.get("dashboard")
});

export default connect(mapStateToProps)(Search_Setting)