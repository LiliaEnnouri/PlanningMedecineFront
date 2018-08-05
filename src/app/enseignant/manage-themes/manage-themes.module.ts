import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../administrateur/shared/shared.module";
import {ManageThemesRouting} from "./manage-themes.routing";
import {ListUnitesComponent} from "./list-unites/list-unites.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ManageThemesRouting
  ],
  declarations: [
    ListUnitesComponent
  ]
})
export class ManageThemesModule { }
