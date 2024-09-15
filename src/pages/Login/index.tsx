import { ActivityIndicator, Alert, Keyboard, Platform } from "react-native";
import {
  Container,
  ContainerInput,
  Input,
  Link,
  LinkText,
  Logo,
  SubmitButtom,
  SubmitText,
} from "../../styles/auth.style";
import Entypo from "@expo/vector-icons/Entypo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/rootStackParamList";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Background } from "../../styles/global";

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, "Login">;

export const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { loadingAuth, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email) {
      Alert.alert("Campos inválidos", "O campo o email é obrigatorio")
      return
    }

    if (!password) {
      Alert.alert("Campos inválidos", "O campo o senha é obrigatorio")
      return
    }
    login(email, password)
    reset()
  }

  const reset = () => {
    setEmail('')
    setPassword('')
    Keyboard.dismiss()
  }

  return (
    <Background>
      {/* Ajusta a tela de acordo com a plataforma */}
      <Container behavior={Platform.OS === "ios" ? "padding" : undefined} enabled>
        <Logo source={require("../../../assets/images/Logo.png")} />
        <ContainerInput>
          < Input
            placeholder="Digite o seu email"
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(v) => setEmail(v)}
          />
        </ContainerInput>
        <ContainerInput>
          < Input
            placeholder="Digite a sua senha"
            value={password}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(v) => setPassword(v)}
          />
        </ContainerInput>
        <SubmitButtom onPress={handleLogin}>
          {
            loadingAuth ?
              (
                <ActivityIndicator size={24} color="#fff" />
              ) : (
                <Entypo name="login" size={24} color="#fff" />
              )
          }
          <SubmitText>{loadingAuth ? "Carregando..." : "Logar"}</SubmitText>
        </SubmitButtom>
        <Link onPress={() => navigation.navigate("Register")}>
          <LinkText>Criar uma Conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
};
