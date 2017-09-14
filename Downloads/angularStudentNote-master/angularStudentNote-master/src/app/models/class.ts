export class Class {
  id: number;
  stufe: string;
  fach: string;
  teacherID: number;

  constructor(id: number, stufe: string, fach: string, teacherID: number) {
    this.id = id;
    this.stufe = stufe;
    this.fach = fach;
    this.teacherID = teacherID;
  }
}
