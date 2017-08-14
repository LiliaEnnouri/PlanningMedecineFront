import {NgModule} from "@angular/core";
import {StudentRoutingModule} from "./manage-student.routing";
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

@NgModule({
  imports: [
    SharedModule,
    StudentRoutingModule
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
    StudiesStudentFileComponent]
})
export class ManageStudentModule {
}
