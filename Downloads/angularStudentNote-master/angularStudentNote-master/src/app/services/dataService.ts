import { Injectable } from '@angular/core';
import {Student} from '../models/student';
import {Class} from '../models/class';
import {Teacher} from '../models/teacher';
import {Note} from '../models/note';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class DataService {

  private teachers = [
    new Teacher('Dirk', 'Saller', 'ds@web.de', Md5.hashStr('test').toString()),
    new Teacher('Helmut', 'Neemann', 'hn@web.de', Md5.hashStr('test').toString())
  ];
  private classes = [
    new Class('INF16B', 'Angewandte Informatik', this.teachers[0].id)
  ];
  private students = [
    new Student('Max', 'Mustermann', this.classes[0].id),
    new Student('Tim', 'Müller', this.classes[0].id)
  ];
  private notes = [
    new Note(new Date().toLocaleString(), '5 Minuten zu spät zum Unterricht',
      this.students[0].id, this.teachers[0].id,
      this.teachers[0].firstName + ' ' + this.teachers[0].lastName),
    new Note(new Date().toLocaleString(), 'Strafarbeit',
      this.students[0].id, this.teachers[0].id,
      this.teachers[0].firstName + ' ' + this.teachers[0].lastName)
  ];

  public getNotes() {
    const sortedNotes = this.notes.sort((n1: Note, n2: Note) => {
      if (n1.timestamp > n2.timestamp) {
        return -1;
      }
      if (n1.timestamp < n2.timestamp) {
        return 1;
      }
      return 0;
    });
    return sortedNotes;
  }

  public getTeachers() {
    return this.teachers;
  }

  public getStudents() {
    return this.students;
  }

  public getClasses() {
    return this.classes;
  }

  public addClass(newClass) {
    this.classes.push(newClass);
    this.save();
  }

  public addStudent(student) {
    this.students.push(student);
    this.save();
  }

  public addNote(note) {
    this.notes.push(note);
    this.save();
  }

  public addTeacher(teacher) {
    this.teachers.push(teacher);
    this.save();
  }

  public deleteTeacher(mail) {
    this.teachers.splice(this.getTeacherIndex(mail), 1);
    this.save();
  }

  public deleteClass(classId) {
    const classIndex = this.getClassIndex(classId);
    if (classIndex !== -1) {
      this.classes.splice(classIndex, 1);
      this.save();
    }
  }

  private getClassIndex(classId) {
    for (let index = 0; index < this.classes.length; index++) {
      if (this.classes[index].id === classId) {
        return index;
      }
    }
    return -1;
  }

  public deleteStudent(studentId) {
    const studentIndex = this.getStudentIndex(studentId);
    if (studentIndex !== -1) {
      this.students.splice(studentIndex, 1);
      this.deleteAllNotesOfStudent(studentId);
      this.save();
    }
  }

  private deleteAllNotesOfStudent(studentId) {
    for (let index = 0; index < this.notes.length; index++) {
      if (this.notes[index].studentId === studentId) {
        this.deleteNote(this.notes[index].id);
        index--;
      }
    }
  }

  public deleteNote(noteId) {
    const noteIndex = this.getNoteIndex(noteId);
    if (noteIndex !== -1) {
      this.notes.splice(noteIndex, 1);
      this.save();
    }
  }

  private getStudentIndex(studentId) {
    for (let index = 0; index < this.students.length; index++) {
      if (this.students[index].id === studentId) {
        return index;
      }
    }
    return -1;
  }

  public updateTeacher(firstName: string, lastName: string, mail: string, newMail: string) {
    const index = this.getTeacherIndex(mail);
    this.teachers[index].firstName = firstName;
    this.teachers[index].lastName = lastName;
    this.teachers[index].mail = newMail;
    this.save();
  }

  public updateNote(noteId, newNoteText) {
    const index = this.getNoteIndex(noteId);
    this.notes[index].timestamp = new Date().toLocaleString();
    this.notes[index].text = newNoteText;
    this.save();
  }

  getNoteIndex(noteId) {
    for (let index = 0; index < this.notes.length; index++) {
      if (this.notes[index].id === noteId) {
        return index;
      }
    }
    return -1;
  }

  getIndexOfClass(classId) {
    for (let index = 0; index < this.classes.length; index++) {
      if (this.classes[index].id === classId) {
        return index;
      }
    }
    return null;
  }

  public updateClass(id: number, stufe: string, fach: string, teacherId: number) {
    const index = this.getIndexOfClass(id);
    this.classes[index].stufe = stufe;
    this.classes[index].fach = fach;
    this.classes[index].teacherID = teacherId;
    this.save();
  }

  getIndexOfStudent(studentId) {
    for (let index = 0; index < this.students.length; index++) {
      if (this.students[index].id === studentId) {
        return index;
      }
    }
    return null;
  }

  public updateStudent(id: number, firstName: string, lastName: string, classId: number) {
    const index = this.getIndexOfStudent(id);
    this.students[index].firstName = firstName;
    this.students[index].lastName = lastName;
    this.students[index].classID = classId;
    this.save();
  }

  private getTeacherIndex(mail) {
    let index;
    for (index = 0; index < this.teachers.length; index++) {
      if (this.teachers[index].mail === mail) {
        break;
      }
    }
    return index;
  }

  public getTeacherById(id: number) {
    const teacher = this.teachers.find(x => x.id === id);
    return teacher;
  }

  public save() {
    localStorage.setItem('data', JSON.stringify({
      students : this.students,
      teachers : this.teachers,
      classes : this.classes,
      notes : this.notes
    }));
  }

  public load() {
    if (localStorage.getItem('data') != null) {
      const data = JSON.parse(localStorage.getItem('data'));
      this.students = data.students;
      this.teachers = data.teachers;
      this.classes = data.classes;
      this.notes = data.notes;
    }
  }
}
