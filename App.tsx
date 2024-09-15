import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/Routes";
import { StatusBar } from "react-native";
import { AuthProvider } from "./src/contexts/auth";
import "react-native-gesture-handler";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#f0f4ff" barStyle={"dark-content"} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
