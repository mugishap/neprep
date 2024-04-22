import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => await AsyncStorage.getItem("token")