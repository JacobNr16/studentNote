import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';
import {Teacher} from '../models/teacher';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-lehrer',
  templateUrl: './lehrer.component.html',
  styleUrls: ['./lehrer.component.css']
})
export class LehrerComponent implements OnInit {

  public teachers;

  constructor(private dataService: DataService) {
    dataService.load();
    this.teachers = dataService.getTeachers();
  }

  isValidFirstName(firstName: string) {
    if (firstName === '') {
      this.showSnackbar('snackbarFirstName');
      return false;
    }
    return true;
  }

  isValidLastName(lastName: string) {
    if (lastName === '') {
      this.showSnackbar('snackbarLastName');
      return false;
    }
    return true;
  }

  isValidTeacher(firstName, lastName, mail, password, password2) {
    return this.isValidFirstName(firstName) &&
      this.isValidLastName(lastName) &&
      this.isValidMail(mail) &&
      this.isValidPassword(password, password2);
  }

  isValidMail(mail: string) {
    let index = mail.indexOf('@');
    if (index > 0) {
      const newMail = mail.substr(index);
      index = newMail.indexOf('.');
      if (index > 1 && newMail.substr(index).length > 0) {
        return true;
      }
    }
    this.showSnackbar('snackbarMail');
    return false;
  }

  isValidPassword(password, password2) {
    if (password.length > 0 && password === password2) {
      return true;
    }
    this.showSnackbar('snackbarPassword');
    return false;
  }

  add(firstName, lastName, mail, password, password2) {
    if (this.isValidTeacher(firstName, lastName, mail, password, password2)) {
      const teacher = new Teacher(5, firstName, lastName, mail, Md5.hashStr(password).toString());
      this.dataService.addTeacher(teacher);
    }
  }

  showSnackbar(elementId: string) {
    const x = document.getElementById(elementId);
    x.className = 'show';
    setTimeout(function(){ x.className = x.className.replace('show', ''); }, 3000);
  }

  editTeacher(firstName, lastName, mail) {
    this.teachers[this.getTeacherIndex((<HTMLInputElement> mail).value)].isEditable = true;
    (<HTMLInputElement> firstName).removeAttribute('readonly');
    (<HTMLInputElement> lastName).removeAttribute('readonly');
    (<HTMLInputElement> mail).removeAttribute('readonly');
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

  deleteTeacher(mail) {
    this.dataService.deleteTeacher(mail);
  }

  updateTeacher(firstName, lastName, mail, newMail) {
    this.teachers[this.getTeacherIndex(mail)].isEditable = false;
    (<HTMLInputElement> firstName).setAttribute('readonly', 'readonly');
    (<HTMLInputElement> lastName).setAttribute('readonly', 'readonly');
    (<HTMLInputElement> newMail).setAttribute('readonly', 'readonly');

    this.dataService.updateTeacher((<HTMLInputElement> firstName).value,
      (<HTMLInputElement> lastName).value, mail, (<HTMLInputElement> newMail).value);
    this.teachers = this.dataService.getTeachers();
  }

  ngOnInit() {
  }

}
