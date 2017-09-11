export class Student {
  id: number;
  firstName: string;
  lastName: string;
  classID: number;

  constructor(id: number, firstName: string, lastName: string, classID: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.classID = classID;
  }
}
