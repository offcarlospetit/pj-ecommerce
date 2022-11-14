import { StyleSheet } from "react-native";
import { pallete, width, height } from '../../ui';

export const DetailStyles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        width,
        height,
    },
    imageContainer: {
        width,
        backgroundColor: pallete.fourth,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    image: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
        position: 'absolute',
        alignSelf: 'center',
    },
    detailContainer: {
        width,
        backgroundColor: pallete.white,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        shadowColor: pallete.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollviewStyle: {
        flexGrow: 1,
    },
});

export const BodyDetailStyles = StyleSheet.create({
    base: {
        flex: 1,
    },
    baseView: {
        flex: 1,
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        paddingBottom: 24,
    },
    containerHeader: {
        flex: 1,
        padding: 16,
        flexDirection: 'row',
    },
    containerHeaderTitle: {
        fontSize: 24,
        fontStyle: 'italic',
        fontWeight: '800',
        color: pallete.secondary,
    },
    containerHeaderName: {
        fontSize: 18,
        fontWeight: '800',
        color: pallete.secondary,
    },
    containerHeaderPrice: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerHeaderPriceText: {
        fontSize: 24,
        fontWeight: '800',
        color: pallete.black,
    },
    containerDetail: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        paddingLeft: 16,
    },
    containerDetailText: {
        color: pallete.black50,
        fontWeight: '700',
    },
    containerDetailTextItem: {
        color: pallete.black,
        fontWeight: '400',
    },
    containerDetailItems: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        paddingLeft: 16,
    },
});