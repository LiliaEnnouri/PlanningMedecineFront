/**
 * Created by Abbes on 25/08/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {InscriptionYearUniversityComponent} from "./inscription-year-university/inscription-year-university.component";
import {ListInscritComponent} from "./list-inscrit/list-inscrit.component";

export const routes: Routes = [
  {
    path: 'year-university',
    component: InscriptionYearUniversityComponent,
  },
  {
    path: 'list-inscrit',
    component: ListInscritComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionsModuleRouting {
}

