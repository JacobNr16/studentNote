import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KlassenComponent } from './klassen/klassen.component';
import { LehrerComponent } from './lehrer/lehrer.component';
import { SchuelerComponent } from './schueler/schueler.component';
import { NotizenComponent } from './Notizen/notizen.component';
import { MainComponent } from './main/main.component';
import {DataService} from './services/dataService';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    KlassenComponent,
    LehrerComponent,
    SchuelerComponent,
    NotizenComponent,
    MainComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
