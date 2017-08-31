import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {AppRoutingModule} from "./app.routing";
import {AuthService} from "./shared/services/auth.service";
import {StorageService} from "app/shared/services/storage.service";
import {UserService} from "./shared/services/user.service";
import {SharedModule} from "./shared/shared.module";
import {LaddaModule} from "angular2-ladda";
import {FormsModule} from "@angular/forms";
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";
import {FullLayoutComponent} from "./layouts/full-layout.component";
import {StudentService} from "./shared/services/student.service";
import {ManageStudentModule} from "./manage-student/manage-student.module";
import {SupportModule} from "./support/support.module";
import {ReclamationService} from "./shared/services/reclamation.service";
import {StudentFileService} from "./shared/services/student-file.service";
import {InscriptionService} from "./shared/services/inscription.service";
import {AdminService} from "./shared/services/admin.service";
import {NotificationService} from "./shared/services/notification.service";
import {InscriptionsModule} from "./inscriptions/inscriptions.module";
import {ManageNotificationModule} from "./manage-notification/manage-notification.module";
import {ConversationService} from "./shared/services/conversation.service";
import {ErrorModule} from "./error/error.module";
import {ImpressionService} from "./shared/services/impression.service";

@NgModule({
  declarations: [
    AppComponent,
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
    ManageStudentModule,
    SupportModule,
    InscriptionsModule,
    ManageNotificationModule,
    ErrorModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthService,
    StorageService,
    UserService,
    StudentService,
    ReclamationService,
    StudentFileService,
    InscriptionService,
    AdminService,
    NotificationService,
    ConversationService,
    ImpressionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
