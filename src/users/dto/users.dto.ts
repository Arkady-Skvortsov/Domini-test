export type resourceType = 'Кристал' | 'Монета';

export interface resuorces<T> {
  coins: T;
  cristaly: T;
}

export default class RecourceOperationDTO<T> {
  id: T;
  resource_type: resourceType;
  count: T;
}
