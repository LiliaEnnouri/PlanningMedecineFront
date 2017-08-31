/**
 * Created by Abbes on 25/08/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ImpressionInscriptionComponent} from "./inscription/impression-inscription.component";

export const routes: Routes = [
  {
    path: 'inscription',
    component: ImpressionInscriptionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpressionsModuleRouting {
}

