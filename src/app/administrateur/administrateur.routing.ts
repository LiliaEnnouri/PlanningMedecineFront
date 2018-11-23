import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManagePlageUniteModule} from "./manage-plage-unite/manage-plage-unite.module";
import {LoginComponent} from "./login/login.component";
import {AfficherNiveauComponent} from "./afficher-niveau/afficher-niveau.component";


export function loadManagePlageUniteModule() {
  return ManagePlageUniteModule
}

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'manage-plage-unite',
    loadChildren: loadManagePlageUniteModule
  },
  {
    path: 'afficher-niveau/:niveauId',
    component: AfficherNiveauComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrateurModuleRouting {
}

