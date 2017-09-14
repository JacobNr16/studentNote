export class Teacher {
  id: number;
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  isEditable = false;

  constructor(firstName: string, lastName: string, mail: string, password: string) {
    this.id = this.getNextId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.password = password;
  }

  private getNextId() {
    let id;
    if (localStorage.getItem('teacherCounter') === null) {
      id = 0;
    } else {
      id = Number(localStorage.teacherCounter);
    }
    localStorage.setItem('teacherCounter', (id + 1).toString());
    return id;
  }
}
