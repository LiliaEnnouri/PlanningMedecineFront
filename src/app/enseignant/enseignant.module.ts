import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "./shared/shared.module";
import {ManageThemesModule} from "./manage-themes/manage-themes.module";
import {EnseignantModuleRouting} from "./enseignant.routing";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../administrateur/shared/services/user.service";
import {GenericService} from "../administrateur/shared/services/generic.service";
import {StorageService} from "../shared/services/storage.service";
import {ThemeService} from "./shared/services/theme.service";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ManageThemesModule,
    EnseignantModuleRouting
  ],
  providers: [
    AuthService,
    GenericService,
    StorageService,
    UserService,
    ThemeService
  ]
})
export class EnseignantModule { }
