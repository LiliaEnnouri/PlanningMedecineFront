import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {BoiteReclamationComponent} from "./boite-reclamation/boite-reclamation.component";
import {ReclamationVayetekComponent} from "./reclamation-vayetek/reclamation-vayetek.component";

export const routes: Routes = [
  {
    path: 'boitereclamation',
    component: BoiteReclamationComponent
  },
  {
    path: 'reclamationvayetek',
    component: ReclamationVayetekComponent
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
