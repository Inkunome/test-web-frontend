interface IUser {
  username: string;
  password: string;
}

const users: Array<IUser> = [
  { username: "hello", password: "world" },
];


export { IUser }
export { users };