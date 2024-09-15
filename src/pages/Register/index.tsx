import { ActivityIndicator, Alert, Keyboard, Platform } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Container,
  ContainerInput,
  Input,
  SubmitButtom,
  SubmitText,
} from "../../styles/auth.style";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Background } from "../../styles/global";

export const Register = () => {
  const { createUser, loadingAuth } = useContext(AuthContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name) {
      Alert.alert("Campos inválidos", "O campo o nome é obrigatorio")
      return
    }
    if (!email) {
      Alert.alert("Campos inválidos", "O campo o email é obrigatorio")
      return
    }

    if (!password) {
      Alert.alert("Campos inválidos", "O campo o senha é obrigatorio")
      return
    }
    createUser(name, email, password)
    reset()
  }

  const reset = () => {
    setName('')
    setEmail('')
    setPassword('')
    Keyboard.dismiss()
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : undefined} enabled>
        <ContainerInput>
          <Input
            placeholder="Digite o seu nome"
            value={name}
            onChangeText={(v) => setName(v)}
          />
        </ContainerInput>
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
        <SubmitButtom onPress={handleRegister}>
          {
            loadingAuth ?
              (
                <ActivityIndicator size={24} color="#fff" />
              ) : (
                <AntDesign name="adduser" size={24} color="#fff" />
              )
          }
          <SubmitText>{loadingAuth ? "Carregando..." : "Criar Conta"}</SubmitText>
        </SubmitButtom>
      </Container>
    </Background>
  );
};
