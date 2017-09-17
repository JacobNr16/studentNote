import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';
import {Class} from '../models/class';

@Component({
  selector: 'app-klassen',
  templateUrl: './klassen.component.html',
  styleUrls: ['./klassen.component.css']
})
export class KlassenComponent implements OnInit {

  public classes;
  public teachers;
  public students;

  constructor(private dataService: DataService) {
    dataService.load();
    this.classes = dataService.getClasses();
    this.teachers = dataService.getTeachers();
    this.students = dataService.getStudents();
  }

  getIndexOfClass(classId) {
    for (let index = 0; index < this.classes.length; index++) {
      if (this.classes[index].id === classId) {
        return index;
      }
    }
    return null;
  }

  editClass(inputStufe, inputFach, inputLehrer, tableAction, classId) {
    const index = this.getIndexOfClass(classId);
    if (index != null) {
      this.classes[index].isEditable = true;
      (<HTMLInputElement> inputStufe).removeAttribute('readonly');
      (<HTMLInputElement> inputFach).removeAttribute('readonly');
      (<HTMLInputElement> inputLehrer).removeAttribute('disabled');

      (<HTMLInputElement> inputStufe).style.backgroundColor = '#ff3333';
      (<HTMLInputElement> inputFach).style.backgroundColor = '#ff3333';
      (<HTMLInputElement> inputLehrer).style.backgroundColor = '#ff3333';
      (<HTMLInputElement> tableAction).style.backgroundColor = '#ff3333';
    }
  }

  updateClass(inputStufe, inputFach, inputLehrer, tableAction, classId) {
    const index = this.getIndexOfClass(classId);
    if (index != null) {
      this.classes[index].isEditable = false;
      (<HTMLInputElement> inputStufe).setAttribute('readonly', 'readonly');
      (<HTMLInputElement> inputFach).setAttribute('readonly', 'readonly');

      (<HTMLInputElement> inputStufe).style.backgroundColor = '';
      (<HTMLInputElement> inputFach).style.backgroundColor = '';
      (<HTMLInputElement> inputLehrer).style.backgroundColor = '';
      (<HTMLInputElement> tableAction).style.backgroundColor = '';

      const teacherIndex = (<HTMLSelectElement> inputLehrer).selectedIndex;
      this.dataService.updateClass(classId, (<HTMLInputElement> inputStufe).value,
        (<HTMLInputElement> inputFach).value, this.teachers[teacherIndex].id);
    }
  }

  add(stufe, fach, teacherIndex) {
    if (this.isValidClass(stufe, fach)) {
      const newClass = new Class(stufe, fach, this.teachers[teacherIndex].id);
      this.dataService.addClass(newClass);
    }
  }

  isValidClass(stufe, fach) {
    return this.isValidStufe(stufe) && this.isUniqueStufe(stufe) && this.isValidFach(fach);
  }

  isUniqueStufe(stufe) {
    for (const klasse of this.classes) {
      if ((<Class> klasse).stufe.toUpperCase() === stufe.toUpperCase()) {
        this.showSnackbar('snackbarStufe2');
        return false;
      }
    }
    return true;
  }

  isValidStufe(stufe) {
    if (stufe === '') {
      this.showSnackbar('snackbarStufe');
      return false;
    }
    return true;
  }

  isValidFach(fach) {
    if (fach === '') {
      this.showSnackbar('snackbarFach');
      return false;
    }
    return true;
  }

  showSnackbar(elementId: string) {
    const x = document.getElementById(elementId);
    x.className = 'show';
    setTimeout(function(){ x.className = x.className.replace('show', ''); }, 3000);
  }

  deleteClass(classId) {
    if (!this.classHasStudents(classId)) {
      this.dataService.deleteClass(classId);
    } else {
      this.showSnackbar('snackbarHasStudents');
    }
  }

  classHasStudents(classId) {
    for (const student of this.students) {
      if (student.classID === classId) {
        return true;
      }
    }
    return false;
  }

  ngOnInit() {
  }

}
