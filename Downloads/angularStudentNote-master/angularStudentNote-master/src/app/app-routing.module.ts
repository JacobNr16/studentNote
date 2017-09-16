import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotizenComponent} from './Notizen/notizen.component';
import {KlassenComponent} from './klassen/klassen.component';
import {LehrerComponent} from './lehrer/lehrer.component';
import {SchuelerComponent} from './schueler/schueler.component';
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'notizen',
    component: NotizenComponent
  },
  {
    path: 'klassen',
    component: KlassenComponent
  },
  {
    path: 'lehrer',
    component: LehrerComponent
  },
  {
    path: 'schüler',
    component: SchuelerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
