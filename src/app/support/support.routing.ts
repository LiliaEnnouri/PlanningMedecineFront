/**
 * Created by AHMED on 03/08/2017.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BoiteReclamationComponent} from "./boite-reclamation/boite-reclamation.component";




export const routes: Routes = [
  {
    path: 'boitereclamation',
    component : BoiteReclamationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportModuleRouting {
}
