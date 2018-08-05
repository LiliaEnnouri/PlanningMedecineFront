import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManageThemesModule} from "./manage-themes/manage-themes.module";


export function loadManageThemesModule() {
  return ManageThemesModule
}

export const routes: Routes = [
  {
    path: 'manage-theme',
    loadChildren: loadManageThemesModule
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantModuleRouting {
}

