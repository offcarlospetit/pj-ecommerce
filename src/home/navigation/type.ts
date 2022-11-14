import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigationParamList } from "../../navigation/RootNavigation";
import { TabParamList } from "../../navigation/TabNavigation";
import { DetailStackParamList } from "./DetailStack";

export type HomeScreenNavigationProp = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'HomeTab'>,
    CompositeScreenProps<
        NativeStackScreenProps<DetailStackParamList, 'Detail'>,
        NativeStackScreenProps<RootNavigationParamList, 'DetailStack'>
    >
>;

export type DetailNavigationProps = CompositeScreenProps<
    NativeStackScreenProps<DetailStackParamList, 'Detail'>,
    NativeStackScreenProps<RootNavigationParamList, 'DetailStack'>
>;