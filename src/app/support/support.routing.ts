/**
 * Created by AHMED on 03/08/2017.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BoiteReclamationComponent} from "./boite-reclamation/boite-reclamation.component";
import {BoiteMessagesComponent} from "./boite-messages/boite-messages.component";




export const routes: Routes = [
  {
    path: 'boitereclamation',
    component : BoiteReclamationComponent
  },
  {
    path: 'messages',
    loadChildren: "./boite-messages/messages.module#MessagesModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportModuleRouting {
}
