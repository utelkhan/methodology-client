export interface ClientAccountTransaction {
  id: number;
  account: number; // account id
  money: number;
  finishedAt?: string; // should be TimeStamp
  type: number;
}
