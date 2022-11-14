import { StyleSheet } from "react-native";
import { pallete, width, height } from '../../ui';

export const CheckoutStyles = StyleSheet.create({
    base: {
        flex: 1,
    },
    addressContainer: {
        flex: 1,
        marginTop: 16,
    },
    address: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    addressLine: {
        flex: 1,
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    goBack: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    productsContainer: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
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
        flex: 1,
        marginTop: 16,
    },
    cartItemsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartTotal: {
        bottom: 0,
        position: 'absolute',
        height: height * 0.14,
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
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 24,
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
    resumeContainer: { flex: 1, marginTop: 16 },
    resumeTitle: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    resumeTotalContainer: { flex: 1, flexDirection: 'row' },
    totalPrice: { flex: 1, alignItems: 'flex-end' },
});
