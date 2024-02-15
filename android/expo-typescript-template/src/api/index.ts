import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = () => axios.create({
  baseURL: "https://expo-template.onrender.com",
  headers: {
    "Authorization": "Bearer " + AsyncStorage.getItem("token")
  }
});

export default api;