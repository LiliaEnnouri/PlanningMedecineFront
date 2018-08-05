import {NgModule} from '@angular/core';
import {ListPlageUniteComponent} from "./list-plage-unite/list-plage-unite.component";
import {ConfigurePlageUniteComponent} from "./configure-plage-unite/configure-plage-unite.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {ManagePlageUniteRouting} from "./manage-plage-unite.routing";


@NgModule({
  declarations: [
    ListPlageUniteComponent,
    ConfigurePlageUniteComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ManagePlageUniteRouting
  ]
})

export class ManagePlageUniteModule { }
