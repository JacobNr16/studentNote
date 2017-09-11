import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KlassenComponent } from './klassen/klassen.component';
import { LehrerComponent } from './lehrer/lehrer.component';
import { SchuelerComponent } from './schueler/schueler.component';
import { NotizenComponent } from './Notizen/notizen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DataService} from './services/dataService';

@NgModule({
  declarations: [
    AppComponent,
    KlassenComponent,
    LehrerComponent,
    SchuelerComponent,
    NotizenComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
