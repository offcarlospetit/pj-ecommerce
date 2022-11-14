import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DetailStackParamList } from "../../home/navigation/DetailStack";
import { RootNavigationParamList } from "../../navigation/RootNavigation";
import { TabParamList } from "../../navigation/TabNavigation";
import { CartStackParamList } from "./CartStack";

export type NavigationProps = CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'HomeTab'>,
    CompositeNavigationProp<
        CompositeNavigationProp<
            NativeStackNavigationProp<DetailStackParamList, 'Detail'>,
            NativeStackNavigationProp<RootNavigationParamList, 'DetailStack'>
        >,
        CompositeNavigationProp<
            NativeStackNavigationProp<CartStackParamList>,
            NativeStackNavigationProp<RootNavigationParamList>
        >
    >
>;