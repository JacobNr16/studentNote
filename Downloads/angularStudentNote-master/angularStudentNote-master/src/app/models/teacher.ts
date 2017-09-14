export class Teacher {
  static counter = 0;
  id: number;
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  isEditable = false;

  constructor(firstName: string, lastName: string, mail: string, password: string) {
    this.id = Teacher.counter++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.password = password;
  }
}
