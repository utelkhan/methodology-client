export interface Client_account_transaction {
  id: number;
  account: number; // account id
  type: string;
  patronymic?: string;
  gender: string;
  birth_date: Date;
  charm: number;
}
