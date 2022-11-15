import { StyleSheet } from "react-native";
import { pallete } from '../../ui';

export const ReceiptStyles = StyleSheet.create({
    base: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    sectionOneContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: pallete.third,
        borderRadius: 8,
        marginBottom: 16,
    },
    sectionTwoContainer: {
        borderWidth: 1,
        borderColor: pallete.third,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    sectionThreeContainer: {
        padding: 16,
        borderWidth: 1,
        borderColor: pallete.third,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    detail: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 5,
        textAlign: 'left',
    },
    orden: {
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 16,
        textAlign: 'center',
    },
    date: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    total: {
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'left',
    },
    thanks: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: pallete.secondary,
        marginTop: 16,
    },
    buttonContainer: {
        flex: 1,
        marginTop: 16,
    },
    button: {
        backgroundColor: pallete.secondary,
        padding: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: pallete.white,
        fontWeight: 'bold',
        fontSize: 18,
    },
    containerScrollView: {
        flex: 1,
        paddingBottom: '35%'
    },
    containerStyle: {
        flexGrow: 1,
        paddingBottom: '35%'
    }
});