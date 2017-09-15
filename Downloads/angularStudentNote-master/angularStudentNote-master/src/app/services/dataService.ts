import { Injectable } from '@angular/core';
import {Student} from '../models/student';
import {Class} from '../models/class';
import {Teacher} from '../models/teacher';

@Injectable()
export class DataService {

  private teachers = [
    new Teacher('Dirk', 'Saller', 'ds@web.de', 'test'),
    new Teacher('Helmut', 'Neemann', 'hn@web.de', 'test')
  ];
  private classes = [
    new Class('INF16B', 'Angewandte Informatik', this.teachers[0].id)
  ];
  private students = [
    new Student('Max', 'Mustermann', this.classes[0].id),
    new Student('Tim', 'Müller', this.classes[0].id)
  ];

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
    console.log(studentIndex);
    if (studentIndex !== -1) {
      this.students.splice(studentIndex, 1);
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

  public save() {
    localStorage.setItem('data', JSON.stringify({
      students : this.students,
      teachers : this.teachers,
      classes : this.classes
    }));
  }

  public load() {
    if (localStorage.getItem('data') != null) {
      const data = JSON.parse(localStorage.getItem('data'));
      this.students = data.students;
      this.teachers = data.teachers;
      this.classes = data.classes;
    }
  }
}
