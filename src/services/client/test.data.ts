import {Client} from '../../app/model/mymodels/client';
import {Charm} from '../../app/model/mymodels/charm';
import {Client_gender} from '../../app/model/mymodels/enums/client_gender';
import {Addr_type} from '../../app/model/mymodels/enums/addr_type';
import {PhoneType} from '../../app/model/phone-type';
import {DatePipe} from '@angular/common';


export const CHARM_DATA: Charm[] = [
  {id: 1, name: 'hysterical', description: 'Type of personality that requires increased attention to yourself. They need constant admiration and reverence. Indifference to their person is the worst scenario for them. Such people are prone to fantasy and lies in order to create a vivid image for themselves. However, they make excellent actors and presenters.', energy: 1},
  {id: 2, name: 'psychasthenic', description: 'People who are prone to introspection and reflection love to delve into themselves and criticize for shortcomings. They have an excellent memory, so they remember their mistakes well and often engage in self-flagellation. Hence, they have a lack of confidence in their abilities, they take too long to make decisions, doubt and are afraid to stumble again. The positive features include loyalty and reliability, they will never betray loved ones and will always stand up for their own.', energy: 100},
  {id: 3, name: 'labile', description: 'Empathic people who can feel the mood and feelings of others well. They often make outstanding psychologists and social workers. They are open and always ready to help and support with a kind word. But this type is very sensitive and touchy, does not tolerate criticism in his address, cannot stand loneliness and changes in life.', energy: 100},
  {id: 4, name: 'conformal', description: 'People who are distinguished by the desire to live like everyone else and who do not want to stand out from the crowd once again. The opinion of others is very important to them, they try to earn the praise and approval of others. Basically, the way of life of such people directly depends on the society in which they live. If there are religious people around them, then the conformist will be a believer to the point of fanaticism. It is also difficult for them to change something in their lives, it is difficult to pull them out of their comfort zone. Positive features include low conflict, friendliness, devotion and diligence.', energy: 100},
];

export const CLIENT_DATA: Client[] = [
  {
    id: 1,
    surname: 'Nurtaev', name: 'Yernar', patronymic: 'Kenzheuly',
    gender: Client_gender.MALE,
    birth_date: new Date('12-01-1997'),
    charm: CHARM_DATA[0],
    regAddress: {client: 1, type: Addr_type.REG, street: 'first_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    factAddress: {client: 1, type: Addr_type.FACT, street: 'first_clients_street', house: 'first_clients_house', flat : 'first_clients_flat'},
    phones: [
      {client: 1, number: '81111111111', type: PhoneType.MOBILE},
      {client: 1, number: '71111111111', type: PhoneType.WORK}],
  },
  {
    id: 2,
    surname: 'Sugurali', name: 'Aibek',
    gender: Client_gender.MALE, birth_date: new Date('12-02-2002'),
    charm: CHARM_DATA[1],
    regAddress:  {client: 2, type: Addr_type.REG, street: 'second_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    factAddress:   {client: 2, type: Addr_type.FACT, street: 'second_clients_street', house: 'first_clients_house', flat : 'first_clients_flat'},
    phones: [
      {client: 2, number: '82222222222', type: PhoneType.MOBILE},]
  },
  {
    id: 3,
    surname: 'Amanbek', name: 'Azamat',
    gender: Client_gender.MALE,
    birth_date: new Date('12-03-2002'),
    charm: CHARM_DATA[2],
    regAddress:  {client: 3, type: Addr_type.REG, street: 'third_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    phones: [
      {client: 3, number: '83333333333', type: PhoneType.MOBILE},],
  },
  {
    id: 4,
    surname: 'Berkin', name: 'Alua', patronymic: 'Aidoskyzy',
    gender: Client_gender.FEMALE,
    birth_date: new Date('12-04-1976'),
    charm: CHARM_DATA[3],
    regAddress: {client: 4, type: Addr_type.REG, street: 'third_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    factAddress:  {client: 4, type: Addr_type.FACT, street: 'fourth_clients_street', house: 'first_clients_house', flat : 'first_clients_flat'},
    phones: [
      {client: 4, number: '84444444444', type: PhoneType.MOBILE},
      {client: 4, number: '84444444433', type: PhoneType.MOBILE},
      {client: 4, number: '74444444444', type: PhoneType.WORK},],
  },
  {
    id: 5,
    surname: 'Omar', name: 'Aliya',
    gender: Client_gender.FEMALE,
    birth_date: new Date('12-05-2002'),
    charm: CHARM_DATA[0],
    regAddress:  {client: 5, type: Addr_type.REG, street: 'fifth_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    phones: [
      {client: 5, number: '85555555555', type: PhoneType.MOBILE},
      {client: 5, number: '65555555555', type: PhoneType.HOME},],
  },
  {
    id: 6,
    surname: 'Kanat', name: 'Alena',
    gender: Client_gender.FEMALE,
    birth_date: new Date('12-06-2002'),
    charm: CHARM_DATA[1],
    regAddress:  {client: 6, type: Addr_type.REG, street: 'sixth_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    phones: [
      {client: 6, number: '86666666666', type: PhoneType.MOBILE},],
  },
  {
    id: 1,
    surname: 'Nurtaev', name: 'Yernar', patronymic: 'Kenzheuly',
    gender: Client_gender.MALE,
    birth_date: new Date('12-01-1997'),
    charm: CHARM_DATA[0],
    regAddress: {client: 1, type: Addr_type.REG, street: 'first_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    factAddress: {client: 1, type: Addr_type.FACT, street: 'first_clients_street', house: 'first_clients_house', flat : 'first_clients_flat'},
    phones: [
      {client: 1, number: '81111111111', type: PhoneType.MOBILE},
      {client: 1, number: '71111111111', type: PhoneType.WORK}],
  },
  {
    id: 2,
    surname: 'Sugurali', name: 'Aibek',
    gender: Client_gender.MALE, birth_date: new Date('12-02-2002'),
    charm: CHARM_DATA[1],
    regAddress:  {client: 2, type: Addr_type.REG, street: 'second_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    factAddress:   {client: 2, type: Addr_type.FACT, street: 'second_clients_street', house: 'first_clients_house', flat : 'first_clients_flat'},
    phones: [
      {client: 2, number: '82222222222', type: PhoneType.MOBILE},]
  },
  {
    id: 3,
    surname: 'Amanbek', name: 'Azamat',
    gender: Client_gender.MALE,
    birth_date: new Date('12-03-2002'),
    charm: CHARM_DATA[2],
    regAddress:  {client: 3, type: Addr_type.REG, street: 'third_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    phones: [
      {client: 3, number: '83333333333', type: PhoneType.MOBILE},],
  },
  {
    id: 4,
    surname: 'Berkin', name: 'Alua', patronymic: 'Aidoskyzy',
    gender: Client_gender.FEMALE,
    birth_date: new Date('12-04-1976'),
    charm: CHARM_DATA[3],
    regAddress: {client: 4, type: Addr_type.REG, street: 'third_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    factAddress:  {client: 4, type: Addr_type.FACT, street: 'fourth_clients_street', house: 'first_clients_house', flat : 'first_clients_flat'},
    phones: [
      {client: 4, number: '84444444444', type: PhoneType.MOBILE},
      {client: 4, number: '84444444433', type: PhoneType.MOBILE},
      {client: 4, number: '74444444444', type: PhoneType.WORK},],
  },
  {
    id: 5,
    surname: 'Omar', name: 'Aliya',
    gender: Client_gender.FEMALE,
    birth_date: new Date('12-05-2002'),
    charm: CHARM_DATA[0],
    regAddress:  {client: 5, type: Addr_type.REG, street: 'fifth_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    phones: [
      {client: 5, number: '85555555555', type: PhoneType.MOBILE},
      {client: 5, number: '65555555555', type: PhoneType.HOME},],
  },
  {
    id: 6,
    surname: 'Kanat', name: 'Alena',
    gender: Client_gender.FEMALE,
    birth_date: new Date('12-06-2002'),
    charm: CHARM_DATA[1],
    regAddress:  {client: 6, type: Addr_type.REG, street: 'sixth_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    phones: [
      {client: 6, number: '86666666666', type: PhoneType.MOBILE},],
  },
  {
    id: 1,
    surname: 'Nurtaev', name: 'Yernar', patronymic: 'Kenzheuly',
    gender: Client_gender.MALE,
    birth_date: new Date('12-01-1997'),
    charm: CHARM_DATA[0],
    regAddress: {client: 1, type: Addr_type.REG, street: 'first_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    factAddress: {client: 1, type: Addr_type.FACT, street: 'first_clients_street', house: 'first_clients_house', flat : 'first_clients_flat'},
    phones: [
      {client: 1, number: '81111111111', type: PhoneType.MOBILE},
      {client: 1, number: '71111111111', type: PhoneType.WORK}],
  },
  {
    id: 2,
    surname: 'Sugurali', name: 'Aibek',
    gender: Client_gender.MALE, birth_date: new Date('12-02-2002'),
    charm: CHARM_DATA[1],
    regAddress:  {client: 2, type: Addr_type.REG, street: 'second_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    factAddress:   {client: 2, type: Addr_type.FACT, street: 'second_clients_street', house: 'first_clients_house', flat : 'first_clients_flat'},
    phones: [
      {client: 2, number: '82222222222', type: PhoneType.MOBILE},]
  },
  {
    id: 3,
    surname: 'Amanbek', name: 'Azamat',
    gender: Client_gender.MALE,
    birth_date: new Date('12-03-2002'),
    charm: CHARM_DATA[2],
    regAddress:  {client: 3, type: Addr_type.REG, street: 'third_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    phones: [
      {client: 3, number: '83333333333', type: PhoneType.MOBILE},],
  },
  {
    id: 4,
    surname: 'Berkin', name: 'Alua', patronymic: 'Aidoskyzy',
    gender: Client_gender.FEMALE,
    birth_date: new Date('12-04-1976'),
    charm: CHARM_DATA[3],
    regAddress: {client: 4, type: Addr_type.REG, street: 'third_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    factAddress:  {client: 4, type: Addr_type.FACT, street: 'fourth_clients_street', house: 'first_clients_house', flat : 'first_clients_flat'},
    phones: [
      {client: 4, number: '84444444444', type: PhoneType.MOBILE},
      {client: 4, number: '84444444433', type: PhoneType.MOBILE},
      {client: 4, number: '74444444444', type: PhoneType.WORK},],
  },
  {
    id: 5,
    surname: 'Omar', name: 'Aliya',
    gender: Client_gender.FEMALE,
    birth_date: new Date('12-05-2002'),
    charm: CHARM_DATA[0],
    regAddress:  {client: 5, type: Addr_type.REG, street: 'fifth_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    phones: [
      {client: 5, number: '85555555555', type: PhoneType.MOBILE},
      {client: 5, number: '65555555555', type: PhoneType.HOME},],
  },
  {
    id: 6,
    surname: 'Kanat', name: 'Alena',
    gender: Client_gender.FEMALE,
    birth_date: new Date('12-06-2002'),
    charm: CHARM_DATA[1],
    regAddress:  {client: 6, type: Addr_type.REG, street: 'sixth_clients_street_REG', house: 'first_clients_house_REG', flat : 'first_clients_flat_REG'},
    phones: [
      {client: 6, number: '86666666666', type: PhoneType.MOBILE},],
  },
];
