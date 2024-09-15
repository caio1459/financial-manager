import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const AuthRoutes = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
          headerStyle: {
            backgroundColor: "#3b3dbf",
          },
          headerTintColor: "#fff",
          headerTitle: "Voltar",
          headerBackTitleVisible: false, //Tira o titulo ao lado da flecha de voltar no IOS
        }}
      />
    </AuthStack.Navigator>
  );
};
