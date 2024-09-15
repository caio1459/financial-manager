import { AuthRoutes } from "./auth.routes"
import { AppRoutes } from "./app.routes"
import { useContext } from "react"
import { AuthContext } from "../contexts/auth"
import { ContainerLoading } from "../styles/global"
import { ActivityIndicator } from "react-native"

export const Routes = () => {
  const { isLogged, loading } = useContext(AuthContext)
  //Se estiver carregando o usuário mostra o loading antes de mostrar as rotas
  if (loading) {
    return (
      <ContainerLoading>
        <ActivityIndicator size={"large"} color={'#131313'} />
      </ContainerLoading>
    )
  }
  return (
    isLogged ? <AppRoutes /> : <AuthRoutes />
  )
}