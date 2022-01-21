export interface IAccount {
  id: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface IPerson {
  id: string;
  account: IAccount;
}

export interface IAppointment {
  id: string;
  type: string;
  status: string;
  description: string;
  serviceStart: string;
  serviceEnd: string;
  patient: IPerson;
  signee: IPerson;
  supervisor?: IPerson;
}
