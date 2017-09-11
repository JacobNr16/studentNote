import { Injectable } from '@angular/core';
import {Student} from '../models/student';
import {Class} from '../models/class';
import {Teacher} from '../models/teacher';

@Injectable()
export class DataService {

  private teachers = [];
  private classes = [];
  private students = [];


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

  public save() {
    localStorage.setItem('data', JSON.stringify({
      students : this.students,
      teachers : this.teachers,
      classes : this.classes
    }));
  }

  public load() {
    const data = JSON.parse(localStorage.getItem('data'));
    this.students = data.students;
    this.teachers = data.teachers;
    this.classes = data.classes;
  }
}
