import { StyleSheet } from "react-native";
import { pallete } from '../../ui';

export const HomeStyles = StyleSheet.create({
    base: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
    },
    loader: {
        marginTop: 10,
        alignItems: 'center',
    },
    detail: {
        flex: 2,
    },
    image: {
        width: 100,
        height: 100,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: pallete.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addRemoveContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    counter: {
        paddingHorizontal: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: pallete.fourth,
    },
});