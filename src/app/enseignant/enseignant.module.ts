import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "./shared/shared.module";
import {ManageThemesModule} from "./manage-themes/manage-themes.module";
import {EnseignantModuleRouting} from "./enseignant.routing";
import {ThemeService} from "./shared/services/theme.service";
import {EnseignantService} from "./shared/services/enseignant.service";
import {AuthService} from "./shared/services/auth.service";
import {GenericService} from "./shared/services/generic.service";
import {UserService} from "./shared/services/user.service";
import {StorageService} from "./shared/services/storage.service";
import {AfficherUnitesComponent} from "./afficher-unites/afficher-unites.component";
import {SeanceService} from "./shared/services/seance.service";
import {PlageUniteService} from "./shared/services/plage_unite.service";

@NgModule({
  declarations: [
    LoginComponent,
    AfficherUnitesComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    EnseignantModuleRouting,
    ManageThemesModule
  ],
  providers: [
    AuthService,
    GenericService,
    StorageService,
    UserService,
    ThemeService,
    EnseignantService,
    SeanceService,
    PlageUniteService
  ]
})
export class EnseignantModule { }
