export class Teacher {
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  isEditable = false;

  constructor(firstName: string, lastName: string, mail: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.password = password;
  }
}
