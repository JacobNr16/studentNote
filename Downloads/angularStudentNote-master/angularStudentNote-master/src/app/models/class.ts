export class Class {
  id: number;
  stufe: string;
  fach: string;
  teacherID: number;
  isEditable = false;

  constructor(stufe: string, fach: string, teacherID: number) {
    this.id = this.getNextId();
    this.stufe = stufe;
    this.fach = fach;
    this.teacherID = teacherID;
  }

  private getNextId() {
    let id;
    if (localStorage.getItem('classCounter') === null) {
      id = 0;
    } else {
      id = Number(localStorage.classCounter);
    }
    localStorage.setItem('classCounter', (id + 1).toString());
    return id;
  }
}
