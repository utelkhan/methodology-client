export interface ClientAccount {
  id: string;
  client: string; // client id
  money: number;
  number: string;
  registeredAt: Date; // should be TimeStamp
}
