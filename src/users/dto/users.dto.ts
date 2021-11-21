export type resourceType = 'Кристалы' | 'Монеты';

export class resuorces<T> {
  coins: T;
  cristaly: T;
}

export class UpdateUserDTO<T> {
  coins?: T;
  cristaly?: T;
  jwtToken?: any;
  catchInvites?: any;
  catchPresents?: any;
  friends?: any;
}

export default class RecourceOperationDTO<T> {
  id: T;
  resource_type: resourceType;
  count: T;
}
