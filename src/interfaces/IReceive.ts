import { ReceiveType } from "../types/receivesType";

export interface IReceive {
  id: string;
  user_id: string;
  description: string;
  value: number;
  type: ReceiveType;
  date: string;
  created_at?: string;
  updated_at?: string;
}

export interface IReceiveTag {
  tag: ReceiveType;
  saldo: number;
}
