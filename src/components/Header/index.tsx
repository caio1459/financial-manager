import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Container, Title } from "./styles";
import Entypo from '@expo/vector-icons/Entypo';

interface IHeaderProps {
  title: string
}

export const Header = ({ title }: IHeaderProps) => {
  const navigation = useNavigation()

  return (
    <Container>
      <Entypo
        name="menu"
        size={35} color="black"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Title>
        {title}
      </Title>
    </Container>
  )
}