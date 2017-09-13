import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {


  public onLogin() {
    sessionStorage.setItem('login', 'loggedIn');
  }

  public isLoggedIn() {
    return sessionStorage.getItem('login') === 'loggedIn';
  }
}
