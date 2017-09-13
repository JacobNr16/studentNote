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
      this.isUniqueMail(mail) &&
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

  isUniqueMail(mail: string) {
    for (const teacher of this.teachers) {
      if ((<Teacher> teacher).mail === mail) {
        this.showSnackbar('snackbarMail2');
        return false;
      }
    }
    return true;
  }

  add(firstName, lastName, mail, password, password2) {
    if (this.isValidTeacher(firstName, lastName, mail, password, password2)) {
      const teacher = new Teacher(firstName, lastName, mail, Md5.hashStr(password).toString());
      this.dataService.addTeacher(teacher);
    }
  }

  showSnackbar(elementId: string) {
    const x = document.getElementById(elementId);
    x.className = 'show';
    setTimeout(function(){ x.className = x.className.replace('show', ''); }, 3000);
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

  editTeacher(firstName, lastName, mail, action) {
    this.teachers[this.getTeacherIndex((<HTMLInputElement> mail).value)].isEditable = true;
    (<HTMLInputElement> firstName).removeAttribute('readonly');
    (<HTMLInputElement> lastName).removeAttribute('readonly');
    (<HTMLInputElement> mail).removeAttribute('readonly');
    (<HTMLInputElement> firstName).style.backgroundColor = '#ff3333';
    (<HTMLInputElement> lastName).style.backgroundColor = '#ff3333';
    (<HTMLInputElement> mail).style.backgroundColor = '#ff3333';
    (<HTMLInputElement> action).style.backgroundColor = '#ff3333';
  }

  updateTeacher(firstName, lastName, mail, newMail, action, index) {
    this.teachers[this.getTeacherIndex(mail)].isEditable = false;
    (<HTMLInputElement> firstName).setAttribute('readonly', 'readonly');
    (<HTMLInputElement> lastName).setAttribute('readonly', 'readonly');
    (<HTMLInputElement> newMail).setAttribute('readonly', 'readonly');

    if (index % 2 === 0) {
      (<HTMLInputElement> firstName).style.backgroundColor = '#F0F0F0';
      (<HTMLInputElement> lastName).style.backgroundColor = '#F0F0F0';
      (<HTMLInputElement> newMail).style.backgroundColor = '#F0F0F0';
      (<HTMLInputElement> action).style.backgroundColor = '#F0F0F0';
    } else {
      (<HTMLInputElement> firstName).style.backgroundColor = '#FFFFFF';
      (<HTMLInputElement> lastName).style.backgroundColor = '#FFFFFF';
      (<HTMLInputElement> newMail).style.backgroundColor = '#FFFFFF';
      (<HTMLInputElement> action).style.backgroundColor = '#FFFFFF';
    }

    if ((<HTMLInputElement> newMail).value === mail || this.isUniqueMail((<HTMLInputElement> newMail).value)) {
      this.dataService.updateTeacher((<HTMLInputElement> firstName).value,
        (<HTMLInputElement> lastName).value, mail, (<HTMLInputElement> newMail).value);
      this.teachers = this.dataService.getTeachers();
    } else {
      (<HTMLInputElement> newMail).value = mail;
    }
  }

  ngOnInit() {
  }

}
