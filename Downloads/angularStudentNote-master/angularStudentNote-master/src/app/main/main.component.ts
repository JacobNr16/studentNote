import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';
import {SchuelerComponent} from "../schueler/schueler.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private dataService: DataService) {
    if (localStorage.getItem('data') == null) {
      this.dataService.save();
    }
  }

  public onLogout() {
    sessionStorage.clear();
  }

  changePassword() {

  }

  ngOnInit() {
  }
}
