import { Injectable } from '@angular/core';
import {Student} from '../models/student';
import {Class} from '../models/class';
import {Teacher} from '../models/teacher';

@Injectable()
export class DataService {

  private teachers = [
    new Teacher(1, 'Dirk', 'Saller', 'ds@web.de', 'test'),
    new Teacher(1, 'Helmut', 'Neemann', 'hn@web.de', 'test')
  ];
  private classes = [
    new Class(1, 'INF16B', 2)
  ];
  private students = [
    new Student(1, 'Max', 'Mustermann', 2),
    new Student(2, 'Tim', 'Müller', 2)
  ];


  public getTeachers() {
    return this.teachers;
  }

  public getStudents() {
    return this.students;
  }

  public getClasses() {
    return this.getClasses();
  }

  public addStudent(student) {
    this.students.push(student);
    this.save();
  }

  public addTeacher(teacher) {
    this.teachers.push(teacher);
    this.save();
  }

  public save() {
    localStorage.setItem('data', JSON.stringify({
      students : this.students,
      teachers : this.teachers,
      classes : this.classes
    }));
  }

  public load() {
    if (localStorage.getItem('data') !== null) {
      const data = JSON.parse(localStorage.getItem('data'));
      this.students = data.students;
      this.teachers = data.teachers;
      this.classes = data.classes;
    }
  }
}
