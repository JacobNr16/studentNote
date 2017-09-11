export class Note {
  id: number;
  text: string;
  studentID: number;

  constructor(id: number, text: string, studentID: number) {
    this.id = id;
    this.text = text;
    this.studentID = studentID;
  }
}
