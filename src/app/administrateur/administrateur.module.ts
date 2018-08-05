import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "./shared/shared.module";
import {ManagePlageUniteModule} from "./manage-plage-unite/manage-plage-unite.module";
import {GenericService} from "./shared/services/generic.service";
import {StorageService} from "../shared/services/storage.service";
import {UniteService} from "./shared/services/unite.service";
import {PlageUniteService} from "./shared/services/plage_unite.service";
import {AuthService} from "../shared/services/auth.service";
import {SharedService} from "./shared/services/shared.service";
import {UserService} from "./shared/services/user.service";
import {TypeService} from "./shared/services/type.service";
import {AdministrateurModuleRouting} from "./administrateur.routing";

@NgModule({
  declarations: [
    LoginComponent
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
    TypeService
    ]
})
export class AdministrateurModule {
}
