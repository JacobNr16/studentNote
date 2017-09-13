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
  public is

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
      this.isValidMail(mail);
  }

  isValidMail(mail: string) {
    const index = mail.indexOf('@');
    if (index > 0) {
      const newMail = mail.substr(index);
      if (newMail.indexOf('.') > 0) {
        return true;
      }
    }
    this.showSnackbar('snackbarMail');
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

  test(lastName) {
    console.log(lastName);
  }

  deleteTeacher(mail) {
    this.dataService.deleteTeacher(mail);
  }

  ngOnInit() {
  }

}
