import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  public onLogout() {
    sessionStorage.clear();
  }

  home(test) {
    //(<HTMLLinkElement> test).setA
  }
}
