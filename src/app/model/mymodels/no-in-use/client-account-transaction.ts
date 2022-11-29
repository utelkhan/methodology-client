export interface ClientAccountTransaction {
  id: string;
  account: string; // account id
  money: number;
  finishedAt?: string; // should be TimeStamp
  type: number;
}
