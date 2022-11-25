// todo: Название файла cluent_account, внутри моделька называется Client
//  Если не используешь этот класс, лучше будет не создавать её пока.
//  Либо не забывать проверять, что создал, чтобы не разнился название класса и файла
//  Это может запутать других разработчиков
export interface Client {
  id: number;
  client: number; // client id
  money: number;
  number: string;
  registered_at: Date;
}
