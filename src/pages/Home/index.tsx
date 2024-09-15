import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Background } from "../../styles/global";
import { IReceive, IReceiveTag } from "../../interfaces/IReceive";
import { format } from "date-fns";
import { api } from "../../services/api";
import { AxiosRequestConfig } from "axios";

export const Home = () => {
  const [receives, setReceives] = useState<IReceiveTag[]>([]);
  const [dateMovements, setDateMovements] = useState(new Date);


  const getMovements = async (isActive: boolean) => {
    let dateFormated = format(dateMovements, 'dd/MM/yyyy')
    //Cria os paratros
    const params: AxiosRequestConfig = {
      params: {
        date: dateFormated
      }
    }
    try {
      const res = await api.get("/balance", params)
      if (isActive) setReceives(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isActive = true //Utlizada para controlar o ciclo de vida
    getMovements(isActive)
    return () => {
      isActive = false
    };
  }, []);
  
  return (
    <Background>
      <Header title={"Minhas movimentações"} />
    </Background>
  )
}