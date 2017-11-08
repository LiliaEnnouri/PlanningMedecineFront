import {NgModule} from "@angular/core";
import {ListStudentComponent} from "./list-student/list-student.component";
import {SharedModule} from "../shared/shared.module";
import {DetailStudentComponent} from "./detail-student/detail-student.component";
import {EditStudentComponent} from "./edit-student/edit-student.component";
import {GeneralInfoComponent} from "./student-file/general-info/general-info.component";
import {BacInfoComponent} from "./student-file/bac-info/bac-info.component";
import {DoctauratStudentFileComponent} from "./student-file/doctaurat/doctaurat-student-file.component";
import {FonctionStudentFileComponent} from "./student-file/fonction/fonction-student-file.component";
import {PhotoComponent} from "./student-file/photo/photo.component";
import {ResidanatStudentFileComponent} from "./student-file/residanat/residanat-student-file.component";
import {StudiesStudentFileComponent} from "./student-file/studies/studies-student-file.component";
import {SectionValidationComponent} from "./student-file/shared/section-validation/section-validation.component";
import {ManageStudentRoutingModule} from "app/manage-student/manage-student.routing";
import {VerificationListStudentComponent} from "./verification-list-student/verification-list-student.component";

@NgModule({
  imports: [
    SharedModule,
    ManageStudentRoutingModule
  ],
  declarations: [
    ListStudentComponent,
    DetailStudentComponent,
    EditStudentComponent,
    GeneralInfoComponent,
    BacInfoComponent,
    DoctauratStudentFileComponent,
    FonctionStudentFileComponent,
    PhotoComponent,
    ResidanatStudentFileComponent,
    StudiesStudentFileComponent,
    SectionValidationComponent,
    VerificationListStudentComponent]
})
export class ManageStudentModule {
}
