import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManagePlageUniteModule} from "./manage-plage-unite/manage-plage-unite.module";


export function loadManagePlageUniteModule() {
  return ManagePlageUniteModule
}

export const routes: Routes = [
  {
    path: 'manage-plage-unite',
    loadChildren: loadManagePlageUniteModule
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrateurModuleRouting {
}

