import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';
import {Teacher} from '../models/teacher';

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

  add(firstName, lastName, mail) {
    const teacher = new Teacher(5, firstName, lastName, mail, 'passwort');
    this.dataService.addTeacher(teacher);
  }

  ngOnInit() {
  }

}
