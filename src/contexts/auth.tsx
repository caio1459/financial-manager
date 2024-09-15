import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosRequestConfig } from "axios";
import { IUser } from "../interfaces/IUser";
import { Alert } from "react-native";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthContextProps {
  user: IUser | null;
  createUser: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  isLogged: boolean;
}

export const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true); //Loading para renderização de paginas
  const navigation = useNavigation();

  useEffect(() => {
    loadUser()
  }, []);

  //Função para carregar o usuário
  const loadUser = async () => {
    //Pega o token salvo
    const token = await AsyncStorage.getItem("@finToken").catch(err => console.log(err))
    if (token) {
      //Cria o cabeçalho do token
      const headers: AxiosRequestConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      //Faz a requisição para pegar as informações do usuário
      try {
        const res = await api.get<IUser>("/me", headers)
        //Libera todas as rotas
        api.defaults.headers['Authorization'] = `Bearer ${token}`
        setUser(res.data)
      } catch (error) {
        console.log(error)
        setUser(null) //Se der erro marca como null para deslogar o suário
      }
    }
    setLoading(false)
  }

  const createUser = async (name: string, email: string, password: string) => {
    setLoadingAuth(true);
    try {
      await api.post("/users", { name, password, email });
      setLoadingAuth(false);
      navigation.goBack();
    } catch (error) {
      setLoadingAuth(false);
      Alert.alert("Atenção", "Erro ao criar usuário, por favor revise seus dados")
      console.log("Erro ao cadastrar: ", error);
    }
  };

  const login = async (email: string, password: string) => {
    setLoadingAuth(true)
    try {
      const res = await api.post<IUser>("/login", { email, password })
      //Define o token para todas as rotas ao logar
      api.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
      await AsyncStorage.setItem("@finToken", res.data.token || '')
      setUser(res.data)
      setLoadingAuth(false);
    } catch (error) {
      setLoadingAuth(false);
      Alert.alert("Atenção", "Dados inválidos, por favor revise suas informações")
      console.log("Erro ao logar: ", error);
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.clear().then(() => setUser(null))
    } catch (error) {
      console.log("Erro ao limpar o cache: ", error);
    }
  }

  return (
    //isLogged: !!user seguinifica que se o state de user tiver um valor ele retorna true, senão false
    <AuthContext.Provider value={{ isLogged: !!user, user, createUser, login, loadingAuth, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
