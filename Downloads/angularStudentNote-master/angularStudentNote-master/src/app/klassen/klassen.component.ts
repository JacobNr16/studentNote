import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';

@Component({
  selector: 'app-klassen',
  templateUrl: './klassen.component.html',
  styleUrls: ['./klassen.component.css']
})
export class KlassenComponent implements OnInit {

  public classes;

  constructor(private dataService: DataService) {
    dataService.load();
    this.classes = dataService.getClasses();
  }

  ngOnInit() {
  }

}
