import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "./shared/shared.module";
import {ManagePlageUniteModule} from "./manage-plage-unite/manage-plage-unite.module";
import {GenericService} from "./shared/services/generic.service";
import {UniteService} from "./shared/services/unite.service";
import {PlageUniteService} from "./shared/services/plage_unite.service";
import {SharedService} from "./shared/services/shared.service";
import {UserService} from "./shared/services/user.service";
import {TypeService} from "./shared/services/type.service";
import {AdministrateurModuleRouting} from "./administrateur.routing";
import {AuthService} from "./shared/services/auth.service";
import {AfficherNiveauComponent} from "./afficher-niveau/afficher-niveau.component";
import {NiveauService} from "./shared/services/niveau.service";
import {ThemeService} from "./shared/services/theme.service";
import {SeanceService} from "./shared/services/seance.service";
import {StorageService} from "./shared/services/storage.service";

@NgModule({
  declarations: [
    LoginComponent,
    AfficherNiveauComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ManagePlageUniteModule,
    AdministrateurModuleRouting
  ],
  providers: [
    PlageUniteService,
    UniteService,
    AuthService,
    GenericService,
    StorageService,
    SharedService,
    UserService,
    TypeService,
    ThemeService,
    SeanceService,
    NiveauService
    ]
})
export class AdministrateurModule {
}
