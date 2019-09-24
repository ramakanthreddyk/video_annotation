export class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    usertype: string;
}

export enum Admins {
    SuperAdmin,
    Evaluator,
    Annotator
  }