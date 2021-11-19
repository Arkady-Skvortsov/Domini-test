export type inviteResponse = 'Принять' | 'Отклонить';

export default class CreateInviteDTO<T> {
  text?: T;
  sender: T;
  catcher: T;
}
