import React, { Component } from "react";
import { Alert, TextInput, Dimensions, View, Image, Text, StatusBar, TouchableOpacity, FlatList } from "react-native";
import { Container, Footer, Content, Header, List, ListItem } from "native-base"
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon_Foundation from 'react-native-vector-icons/Foundation'
import Icon_Entypo from 'react-native-vector-icons/Entypo'
import Icon_AntDesign from 'react-native-vector-icons/AntDesign'
import Icon_MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { OffCanvas3D } from 'react-native-off-canvas-menu'
import { connect } from "react-redux";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import colors from "../../../resources/colors";
import dimens from "../../../resources/dimens";
import strings from "../../../resources/strings";
import styles from "../../../resources/styles";
import * as dashboardActions from "../../../actions/dashboard-actions";
import * as rootActions from "../../../actions/root-actions";
import sort_icon from '../../../assets/icons/products_panel_sort_icon.png'
import product_sample from '../../../assets/product_sample.png'
import Modal from "react-native-modal";
import LogoSpinner from '../../../components/LogoSpinner'
const { width, height } = Dimensions.get('window');
export class Products_Panel extends Component {

    constructor() {
        super();

        this.state = {
            likedTickers: [],
            currentPageIndex: 0,
            isLoading: false,
            display_mode: 1,
            search: "",
            show_expand: true,
            isSortPopupOpen: false
        }
    }

    componentDidMount() {

        this.props.dispatch(rootActions.setLoading(true))
        this.props.dispatch(dashboardActions.setList([]))
        let shortList = this.props.dashboard.get("shortList");
        let tickers = []
        if (!shortList || shortList == [])
            tickers = [];
        else {
            for (let i = 0; i < Object.keys(shortList).length; i++) {
                tickers.push(shortList[i].ticker)
            }
        }
        this.setState({ likedTickers: tickers });
        this.props.dispatch(rootActions.setLoading(true));
        setTimeout(() => {
            this.props.dispatch(dashboardActions.getSortedProductCount(this.state.display_mode));
            this.props.dispatch(dashboardActions.getList(this.state.currentPageIndex, this.state.display_mode, this.state.search))
        }, 1000);
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.props.dispatch(rootActions.setLoading(false))
    }

    handleSort = (display_mode) => {
        this.props.dispatch(rootActions.setLoading(true));
        this.setState({ display_mode: display_mode, isSortPopupOpen: false }, () => {
            this.props.dispatch(dashboardActions.setList([]));
            this.props.dispatch(dashboardActions.getSortedProductCount(this.state.display_mode));
            this.props.dispatch(dashboardActions.getList(this.state.currentPageIndex, this.state.display_mode, this.state.search))
        });
    }

    getCompanyContainerColor = (companyName) => {
        switch (companyName) {
            case "PIMCO":
                return "#f8cbad";
            case "NUVEEN":
                return "#b4c7e7";
            case "BLACKROCK":
                return "#ffe699";
            case "T.ROW PRICE":
                return "#e2f0d9";
            case "CAPITAL":
                return "#d9d9d9";
            case "FIDELITY":
                return "#bf8f00";
            case "BLOOMBERG":
                return "#f2635d";
            default:
                return "red";
        }
    }

    getCompanyShortName = (companyName) => {
        switch (companyName) {
            case "PIMCO":
                return "PI";
            case "NUVEEN":
                return "NU";
            case "BLACKROCK":
                return "BR";
            case "T.ROW PRICE":
                return "TP";
            case "CAPITAL":
                return "CP";
            case "FIDELITY":
                return "FI";
            case "BLOOMBERG":
                return "BB";
            default:
                return "IN";
        }
    }

    getRiskColor = (risk) => {
        switch (risk) {
            case "HIGH Margin":
                return "red";
            case "HIGH Risk":
                return "red";
            case "HIGH Profit":
                return "green";
            case "LOW Risk":
                return "green";
            default:
                return "green";
        }
    }
    onPressItemShare = (item) => { }
    onPressItemLike = (item) => {
        let tickers = this.state.likedTickers;
        let found = false;
        for (let i = 0; i < tickers.length; i++) {
            if (tickers[i] == item.ticker) {
                found = true;
                tickers.splice(i, 1);
                break;
            }
        }
        if (!found)
            tickers.push(item.ticker)

        this.setState({ likedTickers: tickers })
        this.props.dispatch(dashboardActions.setShortList(item))
    }

    getLikeColor = (ticker) => {
        let likedTickers = this.state.likedTickers;

        if (!likedTickers || likedTickers == [])
            return "white";
        else {
            let found = false;
            for (let i = 0; i < likedTickers.length; i++) {
                if (likedTickers[i] == ticker)
                    found = true;
                break;
            }
            if (found)
                return "red";
            else
                return "white";
        }
    }

    getProductComponent = (data) => {
        return (
            this.state.show_expand ?
                <TouchableOpacity activeOpacity={0.8}
                    key={data.index}
                    style={[productsStyles.expand_item_container,
                    { marginBottom: data.index == this.props.dashboard.get("list").length - 1 ? 300 : 0 }]}
                    onPress={() => this.props.navigation.navigate("Product_detail", { product: data.item })}>
                    <View
                        evaluation={5}
                        style={productsStyles.expand_SubItem_Container}>
                        <View
                            style={productsStyles.expand_img_container} >
                            <View
                                style={[{
                                    backgroundColor: this.getCompanyContainerColor(data.item.company)
                                },
                                productsStyles.companyNameContainer]}>
                                <Text
                                    style={productsStyles.companyNameText}>
                                    {this.getCompanyShortName(data.item.company)}
                                </Text>
                            </View>
                        </View>
                        <View style={productsStyles.expand_desc_container}>
                            <View
                                style={productsStyles.expand_title_container}>
                                <Text style={productsStyles.expand_title_text}>{data.item.ticker}</Text>
                                <Text
                                    style={[productsStyles.expand_risk_text,
                                    { color: this.getRiskColor(data.item.fundUSP) }]}>{data.item.fundUSP}</Text>
                            </View>
                            <View
                                style={productsStyles.expand_sub_desc_container}>
                                <Text style={productsStyles.expand_sub_desc_text}>{data.item.assetClass}</Text>
                                <Text style={productsStyles.expand_sub_desc_text}>{data.item.issueDate}</Text>
                            </View>
                            <View
                                style={productsStyles.expand_sub_desc_container}>
                                <Text style={productsStyles.expand_sub_desc_text}>{data.item.category}</Text>
                                <Text style={productsStyles.expand_sub_desc_text}>{data.item.closingDate}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity >
                :
                <SwipeRow
                    key={data.index}
                    stopRightSwipe={-100}
                    rightOpenValue={-100}>
                    <View
                        style={{
                            width: 100,
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                        }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                width: '50%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.navBarColor
                            }}
                            onPress={() => this.onPressItemShare(data.item)}>
                            <Icon_MaterialCommunityIcons name="hexagon"
                                style={{
                                    fontSize: dimens.font_size_extra_large,
                                    color: 'white'
                                }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => this.onPressItemLike(data.item)}
                            style={{
                                width: '50%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.primaryColor
                            }}>
                            <Icon_AntDesign name="heart"
                                style={{
                                    fontSize: dimens.font_size_extra_large,
                                    color: this.state.likedTickers.includes(data.item.ticker) ? "red" : "white"
                                }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%' }}>
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => this.props.navigation.navigate("Product_detail", { product: data.item })}
                            style={{
                                width: "100%",
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 3,
                            }}>
                            <View
                                style={[{
                                    backgroundColor: this.getCompanyContainerColor(data.item.company)
                                },
                                productsStyles.companyNameContainer]}>
                                <Text
                                    style={productsStyles.companyNameText}>{this.getCompanyShortName(data.item.company)}</Text>
                            </View>
                            <Text
                                style={{
                                    fontSize: dimens.font_size_large,
                                    color: colors.secondaryColor,
                                    fontWeight: 'bold',
                                    marginLeft: 10
                                }}>
                                {data.item.ticker}
                            </Text>
                            <Icon_Entypo name='chevron-right'
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    fontSize: dimens.font_size_extra_large,
                                    color: 'grey'
                                }} />
                        </TouchableOpacity>
                    </View>
                </SwipeRow>

        );
    }

    onEndReached = () => {
        this.props.dispatch(rootActions.setLoading(true));
        this.setState({ currentPageIndex: this.state.currentPageIndex + 1 }, () => {
            this.props.dispatch(dashboardActions.getList(this.state.currentPageIndex, this.state.display_mode, this.state.search));
        })
    }

    onSearchChanged = (text) => {
        this.props.dispatch(rootActions.setLoading(true));
        this.setState({ search: text, currentPageIndex: 0 }, () => {
            this.props.dispatch(dashboardActions.getList(this.state.currentPageIndex, this.state.display_mode, this.state.search));
        });
    }

    getSortStr = () => {
        switch (this.state.display_mode) {
            case 1:
                return strings.ALL_PRODUCTS;
            case 2:
                return strings.HIGH_RISK_PRODUCTS;
            case 3:
                return strings.LOW_RISK_PRODUCTS;
            default:
                return strings.ALL_PRODUCTS;
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: colors.containerColor }}>
                <StatusBar backgroundColor={colors.navBarColor} barStyle="light-content" />
                <Header style={{ backgroundColor: colors.navBarColor, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.headerLeftButton}
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name='navicon' style={styles.headerLeftButtonIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{strings.FUND_TRACKER}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        height: '100%',
                        alignSelf: 'flex-end',
                        right: 10,
                    }}>
                        <TouchableOpacity activeOpacity={0.9} style={{ marginRight: 10 }} onPress={() => { this.setState({ show_expand: !this.state.show_expand }) }}>
                            <Icon_Foundation
                                name={this.state.show_expand ? 'list-bullet' : 'list'}
                                style={{
                                    fontSize: 30,
                                    color: 'white'
                                }} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ marginRight: 10 }}
                            onPress={() => {
                                this.props.navigation.navigate("Search_Setting");
                            }}>
                            <Icon
                                name={'search'}
                                style={{
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    color: 'white'
                                }} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={styles.containerStyle} contentContainerStyle={{ flex: 1 }}>
                    <View style={{ width: '100%', paddingBottom: 20 }}>
                        <View style={productsStyles.headerContainer}>
                            <View style={productsStyles.titleContainer}>
                                <Text style={productsStyles.titleText}>{strings.PRODUCTS.toUpperCase()}</Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ isSortPopupOpen: true })}>
                                    <Image source={sort_icon}
                                        style={productsStyles.titleImage} />
                                </TouchableOpacity>
                            </View>
                            <View style={productsStyles.subTitleContainer}>
                                <Text style={productsStyles.subTitle}>{this.getSortStr()}</Text>
                                <Text style={productsStyles.subTitle}>{this.props.dashboard.get("sortedProductCount")} {strings.RECORDS}</Text>
                            </View>
                            <View style={productsStyles.searchContainer}>
                                <TextInput
                                    onChangeText={text => this.onSearchChanged(text)}
                                    value={this.state.search}
                                    placeholder={strings.SEARCH}
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 0,
                                        fontSize: dimens.font_size_medium,
                                        paddingVertical: 0,
                                        paddingHorizontal: 10,
                                        paddingBottom: 0,
                                        paddingTop: 0,
                                    }}
                                />
                            </View>
                        </View>

                        {
                            this.props.root.get("isLoading") ? <LogoSpinner /> :
                                <List>
                                    <FlatList
                                        onEndReached={() => this.onEndReached()}
                                        onEndReachedThreshold={0.7}
                                        data={this.props.dashboard.get("list")}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={(data) => this.getProductComponent(data)}
                                    />
                                </List>
                        }
                    </View>
                </Content>
                <Modal isVisible={this.state.isSortPopupOpen}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => { this.setState({ isSortPopupOpen: false }) }}
                        style={{
                            width: '100%',
                            height: height,
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                        <View style={{
                            width: '90%',
                            backgroundColor: 'white',
                            alignSelf: 'center',
                            padding: 20,
                            marginBottom: width / 15,
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
                                onPress={() => this.handleSort(1)}
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
                                onPress={() => this.handleSort(2)}
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
                                onPress={() => this.handleSort(3)}
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
                </Modal>
            </Container>
        );
    }
}
const productsStyles = {
    headerContainer: {
        paddingTop: 30,
        paddingBottom: 5,
        marginBottom: 10
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    titleText: {
        fontWeight: 'bold',
        color: colors.primaryColor,
        fontSize: dimens.font_size_large,
        marginRight: 10
    },
    titleImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: colors.navBarColor
    },
    subTitleContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subTitle: {
        color: colors.primaryColor,
        fontSize: dimens.font_size_small,
    },
    searchContainer: {
        marginTop: 10,
        backgroundColor: colors.strongColor,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5
    },
    expand_item_container: {
        backgroundColor: 'white',
        width: width - 20,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 5,
        borderColor: colors.strongColor,
        borderWidth: 1,
        // alignItems: 'baseline',
        alignContent: 'flex-start'
    },
    expand_SubItem_Container: {
        backgroundColor: 'white',
        width: width - 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    expand_img_container: {
        width: '20%',
        // alignSelf: 'baseline',
        padding: 1
    },
    expand_desc_container: {
        flexDirection: 'column',
        width: '80%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    expand_title_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    expand_title_text: {
        color: colors.secondaryColor,
        fontSize: dimens.font_size_extra_large,
        fontWeight: 'bold'
    },
    expand_risk_text: {
        fontSize: dimens.font_size_small,
    },
    expand_sub_desc_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    expand_sub_desc_text: {
        color: 'black',
        fontSize: dimens.font_size_small,
    },
    expand_img: {
        width: width / 8,
        height: width / 8,
        resizeMode: 'contain'
    },
    companyNameText: {
        fontSize: dimens.font_size_extra_large,
        alignSelf: 'center',
        color: 'black'
    },
    companyNameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: width / 9,
        width: width / 9
    }
};

const mapStateToProps = (state) => ({
    dashboard: state.get("dashboard"),
    root: state.get("root")
});

export default connect(mapStateToProps)(Products_Panel)