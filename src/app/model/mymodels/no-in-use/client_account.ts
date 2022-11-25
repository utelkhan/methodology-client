export interface ClientAccount {
  id: number;
  client: number; // client id
  money: number;
  number: string;
  registeredAt: Date; // should be TimeStamp
}
