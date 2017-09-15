import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';
import {Student} from '../models/student';
import {first} from "rxjs/operator/first";

@Component({
  selector: 'app-schueler',
  templateUrl: './schueler.component.html',
  styleUrls: ['./schueler.component.css']
})
export class SchuelerComponent implements OnInit {

  public students;
  public classes;

  constructor(private dataService: DataService) {
    dataService.load();
    this.students = dataService.getStudents();
    this.classes = dataService.getClasses();
  }

  add(firstName, lastName, classIndex) {
    if (this.isValidStudent(firstName, lastName)) {
      const newStudent = new Student(firstName, lastName, this.classes[classIndex].id);
      this.dataService.addStudent(newStudent);
    }
  }

  isValidStudent(firstName, lastName) {
    return this.isValidFirstName(firstName) && this.isValidLastName(lastName);
  }

  isValidFirstName(firstName) {
    if (firstName === '') {
      this.showSnackbar('snackbarFirstName');
      return false;
    }
    return true;
  }

  isValidLastName(lastName) {
    if (lastName === '') {
      this.showSnackbar('snackbarLastName');
      return false;
    }
    return true;
  }

  showSnackbar(elementId: string) {
    const x = document.getElementById(elementId);
    x.className = 'show';
    setTimeout(function(){ x.className = x.className.replace('show', ''); }, 3000);
  }

  editStudent(inputFirstName, inputLastName, inputClass, tableAction, studentId) {
    const index = this.getIndexOfStudent(studentId);
    if (index != null) {
      this.students[index].isEditable = true;
      (<HTMLInputElement> inputFirstName).removeAttribute('readonly');
      (<HTMLInputElement> inputLastName).removeAttribute('readonly');
      (<HTMLInputElement> inputClass).removeAttribute('disabled');
    }
  }

  getIndexOfStudent(studentId) {
    for (let index = 0; index < this.students.length; index++) {
      if (this.students[index].id === studentId) {
        return index;
      }
    }
    return null;
  }

  updateStudent(inputFirstName, inputLastName, inputClass, tableAction, studentId) {
    const index = this.getIndexOfStudent(studentId);
    if (index != null) {
      this.students[index].isEditable = false;
      (<HTMLInputElement> inputFirstName).setAttribute('readonly', 'readonly');
      (<HTMLInputElement> inputLastName).setAttribute('readonly', 'readonly');

      const classIndex = (<HTMLSelectElement> inputClass).selectedIndex;
      this.dataService.updateStudent(studentId, (<HTMLInputElement> inputFirstName).value,
        (<HTMLInputElement> inputLastName).value, this.classes[classIndex].id);
    }
  }

  deleteStudent(studentId) {
    this.dataService.deleteStudent(studentId);
  }

  ngOnInit() {
  }

}
