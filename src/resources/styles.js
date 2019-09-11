import colors from "./colors";
import dimens from "./dimens";

export default {
    containerStyle: {
        flex: 1,
        width: "100%",
        paddingLeft: 5,
        paddingRight: 5
    },
    headerTitle: {
        fontSize: dimens.font_size_large,
        color: 'white'
    },
    headerLeftButton: {
        height: '100%',
        alignSelf: 'flex-end',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        left: 10
    },
    headerLeftButtonIcon: {
        fontSize: dimens.font_size_extra_large + 5,
        color: 'white'
    }
}