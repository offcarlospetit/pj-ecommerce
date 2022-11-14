import { StyleSheet } from "react-native";
import { pallete, width, height } from '../../ui';

export const CartStyles = StyleSheet.create({
    base: {
        flex: 1,
    },
    goBack: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: pallete.black,
    },
    cartResume: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartResumeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartItems: {
        flex: 5,
        paddingHorizontal: 16,
    },
    cartItemsView: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    cartItemsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartTotal: {
        bottom: 0,
        position: 'absolute',
        height: "24%",
        backgroundColor: pallete.white,
        shadowColor: pallete.secondary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        width: width,
        padding: 16,
    },
    cartTotalText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderWidth: 1,
    },
    totalText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: pallete.primary,
        padding: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: pallete.white,
        fontWeight: 'bold',
    },
    resumeView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    totalResumeView: { flex: 1, flexDirection: 'row' },
    totalPrice: { flex: 1, alignItems: 'flex-end' },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 24,
    },
    textItem: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 8,
    },
    textItemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});