import {NgModule} from "@angular/core";
import {TeacherGeneralInfoComponent} from "./teacher-file/teacher-general-info/teacher-general-info.component";
import {ListTeacherComponent} from "app/manage-teacher/list-teacher/list-teacher.component";
import {EditTeacherComponent} from "./edit-teacher/edit-teacher.component";
import {SharedModule} from "../shared/shared.module";
import {TeacherPhotoComponent} from "./teacher-file/teacher-photo/teacher-photo.component";
import {SectionValidationTeacherComponent} from "./teacher-file/shared/section-validation-teacher/section-validation-teacher.component";
import {ManageTeacherRoutingModule} from "./manage-teacher.routing";
import {AssisAggrProfessComponent} from "./teacher-file/assis-aggr-profess/assis-aggr-profess.component";
import {BacInfoComponent} from "./teacher-file/bac-info/bac-info.component";
import {DescriptifDocumentComponent} from "./teacher-file/shared/descriptif-document/descriptif-document.component";
import {FonctionTeacherFileComponent} from "./teacher-file/fonction/fonction-teacher-file.component";
import {DoctauratTeacherFileComponent} from "./teacher-file/doctaurat/doctaurat-teacher-file.component";
import {ResidanatTeacherFileComponent} from "./teacher-file/residanat/residanat-teacher-file.component";
import {ValidationNoteComponent} from "./teacher-file/shared/validation-note.component";
import { AffectSpecialityComponent } from './affect-speciality/affect-speciality.component';

@NgModule({
  imports: [
    SharedModule,
    ManageTeacherRoutingModule
  ],
  declarations: [
    ListTeacherComponent,
    TeacherGeneralInfoComponent,
    EditTeacherComponent,
    TeacherPhotoComponent,
    SectionValidationTeacherComponent,
    BacInfoComponent,
    DescriptifDocumentComponent,
    FonctionTeacherFileComponent,
    DoctauratTeacherFileComponent,
    ResidanatTeacherFileComponent,
    AssisAggrProfessComponent,
    ValidationNoteComponent,
    AffectSpecialityComponent
  ]
})
export class ManageTeacherModule {
}
