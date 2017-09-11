import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';
import {Student} from '../models/student';

@Component({
  selector: 'app-schueler',
  templateUrl: './schueler.component.html',
  styleUrls: ['./schueler.component.css']
})
export class SchuelerComponent implements OnInit {

  public students;

  constructor(private dataService: DataService) {
    dataService.load();
    this.students = dataService.getStudents();
  }

  add(firstName, lastName) {
    const student = new Student(5, firstName, lastName, 1);
    this.dataService.addStudent(student);
  }

  ngOnInit() {
  }

}
