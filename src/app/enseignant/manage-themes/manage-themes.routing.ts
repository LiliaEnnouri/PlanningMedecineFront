import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListUnitesComponent} from "./list-unites/list-unites.component";

export const routes: Routes = [
  {
    path: 'list-unites/:uniteId',
    component: ListUnitesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageThemesRouting {
}

