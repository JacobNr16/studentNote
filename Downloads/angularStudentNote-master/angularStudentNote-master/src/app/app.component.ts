import {Component, OnInit} from '@angular/core';
import {DataService} from './services/dataService';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  private teachers;

  constructor(private dataService: DataService) {
    dataService.load();
    this.teachers = dataService.getTeachers();
  }

  public onLogin(currentUser, password, event) {
    for (const teacher of this.teachers) {
      if (teacher.mail === currentUser.value && teacher.password === Md5.hashStr(password.value)) {
        sessionStorage.setItem('login', 'loggedIn');
        sessionStorage.setItem('currentUser', teacher.id.toString());
      }
    }
  }

  public isLoggedIn() {
    return sessionStorage.getItem('login') === 'loggedIn';
  }

  ngOnInit() {
  }
}
