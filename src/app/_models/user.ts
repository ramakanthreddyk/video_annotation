export class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    usertype: string;
}
export interface BackendUser {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    user_id: string;
    user_type: Admins;
}

export interface IUser {
    data: BackendUser[];
}

export enum Admins {
    SuperAdmin = 'SuperAdmin',
    Evaluator= 'Evaluator',
    Annotator= 'Annotator'
  }