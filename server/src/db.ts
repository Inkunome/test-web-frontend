interface IUser {
  username: string;
  password: string;
}

interface IThread {
  descriptor: string;
}

interface IMessage {
  id: number;
  descriptor: string;
  content: string;
}

const users: Array<IUser> = [
  { username: "hello", password: "world" },
];

const threads: Array<IThread> = [
  { descriptor: "hello" },
  { descriptor: "world" },
];

const messages: Array<IMessage> = [
  { id: 0, descriptor: "hello", content: "Je suis un **message**" },
];

export { IUser, IThread, IMessage }
export { users, threads, messages };