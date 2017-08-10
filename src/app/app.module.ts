import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {NotFoundComponent} from "./error/not-found.component";
import {LoginComponent} from "./login/login.component";
import {AppRoutingModule} from "./app.routing";
import {AuthService} from "./shared/services/auth.service";
import {StorageService} from "app/shared/services/storage.service";
import {UserService} from "./shared/services/user.service";
import {SharedModule} from "./shared/shared.module";
import {LaddaModule} from "angular2-ladda";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";
import {FullLayoutComponent} from "./layouts/full-layout.component";
import {StudentService} from "./shared/services/student.service";
import {ManageStudentModule} from "./manage-student/manage-student.module";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    FullLayoutComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    LaddaModule,
    ManageStudentModule
  ],
  providers: [
    AuthService,
    StorageService,
    UserService,
    StudentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
