import React, { Component } from "react";
import { Alert, TextInput, Dimensions, View, Image, Text, Button, TouchableOpacity, StatusBar } from "react-native";
import { Container, Footer, Content, Header } from "native-base"
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
export class Product_detail extends Component {
    // static navigationOptions = {
    //     header: null
    // };
    constructor() {
        super();
        this.state = {
            product: {}
        }
    }

    componentWillMount() {
        this.setState({ product: this.props.navigation.getParam("product") })
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
                        <Text style={productDetailStyles.titleText}>{this.state.product.ticker}</Text>
                        <Text style={productDetailStyles.subTitleText}>{this.state.product.name}</Text>
                        <View style={productDetailStyles.switchContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[productDetailStyles.switchItem, { backgroundColor: 'blue' }]}>
                                <Text style={{ color: colors.strongColor, fontSize: dimens.font_size_small }}>{strings.OVERVIEW}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[productDetailStyles.switchItem, { backgroundColor: colors.strongColor }]}>
                                <Text style={{ color: 'grey', fontSize: dimens.font_size_small }}>{strings.DOCUMENTS}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={productDetailStyles.itemContainer}>
                            <Text style={productDetailStyles.itemName}>Asset Class</Text>
                            <Text style={productDetailStyles.itemValue}>{this.state.product.assetClass}</Text>
                        </View>
                        <View style={productDetailStyles.itemContainer}>
                            <Text style={productDetailStyles.itemName}>Category</Text>
                            <Text style={productDetailStyles.itemValue}>{this.state.product.category}</Text>
                        </View>
                        <View style={productDetailStyles.itemContainer}>
                            <Text style={productDetailStyles.itemName}>Product Type</Text>
                            <Text style={productDetailStyles.itemValue}>{this.state.product.company}</Text>
                        </View>
                        <View style={productDetailStyles.itemContainer}>
                            <Text style={productDetailStyles.itemName}>Target Date</Text>
                            <Text style={productDetailStyles.itemValue}>{this.state.product.closingDate}</Text>
                        </View>
                        <View style={productDetailStyles.itemContainer}>
                            <Text style={productDetailStyles.itemName}>Maturity</Text>
                            <Text style={productDetailStyles.itemValue}>{this.state.product.maturityDate}</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
const productDetailStyles = {
    titleText: {
        color: colors.primaryColor,
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
        marginTop: 10,
        marginBottom: 30
    },
    switchItem: {
        padding: 5,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    itemName: {
        color: colors.secondaryColor,
        fontSize: dimens.font_size_medium,
        width: '40%'
    },
    itemValue: {
        color: 'black',
        fontSize: dimens.font_size_medium,
        width: '60%'
    }
};

const mapStateToProps = (state) => ({
    dashboard: state.get("dashboard")
});

export default connect(mapStateToProps)(Product_detail)