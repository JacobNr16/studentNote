export class Student {
  id: number;
  firstName: string;
  lastName: string;
  classID: number;
  isEditable = false;

  constructor(firstName: string, lastName: string, classID: number) {
    this.id = this.getNextId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.classID = classID;
  }

  private getNextId() {
    let id;
    if (localStorage.getItem('studentCounter') === null) {
      id = 0;
    } else {
      id = Number(localStorage.studentCounter);
    }
    localStorage.setItem('studentCounter', (id + 1).toString());
    return id;
  }
}
