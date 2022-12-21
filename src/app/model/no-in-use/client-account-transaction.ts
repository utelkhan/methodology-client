export interface ClientAccountTransaction {
  id: number;
  account: string; // account id
  money: number;
  finishedAt?: string; // should be TimeStamp
  type: number;
}
