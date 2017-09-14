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

  constructor(private dataService: DataService) {
    dataService.load();
    this.classes = dataService.getClasses();
    this.teachers = dataService.getTeachers();
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
    }
  }

  updateClass(inputStufe, inputFach, inputLehrer, tableAction, classId) {
    const index = this.getIndexOfClass(classId);
    if (index != null) {
      this.classes[index].isEditable = false;
      (<HTMLInputElement> inputStufe).setAttribute('readonly', 'readonly');
      (<HTMLInputElement> inputFach).setAttribute('readonly', 'readonly');

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
    return this.isValidStufe(stufe) && this.isValidFach(fach);
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

  ngOnInit() {
  }

}
