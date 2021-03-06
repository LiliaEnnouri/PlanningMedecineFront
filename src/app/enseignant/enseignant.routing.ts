import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManageThemesModule} from "./manage-themes/manage-themes.module";
import {LoginComponent} from "./login/login.component";
import {AfficherUnitesComponent} from "./afficher-unites/afficher-unites.component";
import {AfficherEnseignantComponent} from "./afficher-enseignant/afficher-enseignant.component";


export function loadManageThemesModule() {
  return ManageThemesModule
}

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'manage-theme',
    loadChildren: loadManageThemesModule
  },
  {
    path: 'afficher-unites/:uniteId',
    component: AfficherUnitesComponent
  },
  {
    path: 'afficher-enseignant/:enseignantId',
    component: AfficherEnseignantComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantModuleRouting {
}

