export class Note {
  id: number;
  timestamp: string;
  text: string;
  studentId: number;
  teacherId: number;
  teacherName: string;
  isEditable = false;

  constructor(timestamp: string, text: string, studentId: number, teacherId: number, teacherName: string) {
    this.id = this.getNextId();
    this.timestamp = timestamp;
    this.text = text;
    this.studentId = studentId;
    this.teacherId = teacherId;
    this.teacherName = teacherName;
  }

  private getNextId() {
    let id;
    if (localStorage.getItem('noteCounter') === null) {
      id = 0;
    } else {
      id = Number(localStorage.noteCounter);
    }
    localStorage.setItem('noteCounter', (id + 1).toString());
    return id;
  }
}
