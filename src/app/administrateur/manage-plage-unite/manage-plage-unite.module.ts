import {NgModule} from '@angular/core';
import {ListPlageUniteComponent} from "./list-plage-unite/list-plage-unite.component";
import {ConfigurePlageUniteComponent} from "./configure-plage-unite/configure-plage-unite.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {ManagePlageUniteModuleRouting} from "./manage-plage-unite.routing";



@NgModule({
  declarations: [
    ListPlageUniteComponent,
    ConfigurePlageUniteComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ManagePlageUniteModuleRouting
  ]
})

export class ManagePlageUniteModule { }
