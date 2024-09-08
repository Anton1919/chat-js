export interface IParams {
  [key: string]: string;
}

export interface IUser {
  name: string;
  room: string;
}

export interface IChat {
  user: { name: string; message: string };
  message: string;
}

export interface IMessages {
  messages: IChat[];
  name: string;
}
