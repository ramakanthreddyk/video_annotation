export class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    usertype: string;
}

export interface IUser {
    data: User[];
}

export enum Admins {
    SuperAdmin,
    Evaluator,
    Annotator
  }