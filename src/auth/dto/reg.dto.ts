export default interface RegDTO<T, R> {
  username: T;
  password: T;
  health: R;
  defense: R;
  coins: R;
  refreshToken?: any;
  cristaly: R;
}
