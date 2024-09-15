import styled from "styled-components/native";

//Cria uma View que sobe quando o teclado aparece
export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  margin-bottom: 25px;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  width: 90%;
  font-size: 17px;
  padding: 10px;
  border-radius: 8px;
  color: #121212;
  margin-bottom: 16px;
`;

export const SubmitButtom = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  background-color: #3b3dbf;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  flex-direction: row;
  gap: 20px;
`;

export const SubmitText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const Link = styled.TouchableOpacity`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const LinkText = styled.Text`
  color: #171717;
  font-size: 16px;
`;
