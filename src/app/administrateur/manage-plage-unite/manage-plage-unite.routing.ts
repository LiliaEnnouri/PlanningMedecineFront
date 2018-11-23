import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListPlageUniteComponent} from "./list-plage-unite/list-plage-unite.component";
import {ConfigurePlageUniteComponent} from "./configure-plage-unite/configure-plage-unite.component";

export const routes: Routes = [
  {
    path: 'list-plage-unite',
    component: ListPlageUniteComponent,
  }, {
    path: 'configure-plage-unite/:uniteId',
    component: ConfigurePlageUniteComponent,
  },
  {
    path: 'configure-plage-unite/edit/:uniteId',
    component: ConfigurePlageUniteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePlageUniteRouting {
}

