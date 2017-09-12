export class Teacher {
  id: number;
  firstName: string;
  lastName: string;
  mail: string;
  password: string;

  constructor(id: number, firstName: string, lastName: string, mail: string, password: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.password = password;
  }
}
