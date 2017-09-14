import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';

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

  ngOnInit() {
  }

  public onLogout() {
    sessionStorage.clear();
  }

  home(test) {
    //(<HTMLLinkElement> test).setA
  }
}
