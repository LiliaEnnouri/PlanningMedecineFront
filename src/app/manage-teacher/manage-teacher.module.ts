import {NgModule} from "@angular/core";
import {TeacherGeneralInfoComponent} from "./teacher-file/teacher-general-info/teacher-general-info.component";
import {ListTeacherComponent} from "app/manage-teacher/list-teacher/list-teacher.component";
import {EditTeacherComponent} from "./edit-teacher/edit-teacher.component";
import {SharedModule} from "../shared/shared.module";
import {TeacherPhotoComponent} from "./teacher-file/teacher-photo/teacher-photo.component";
import {SectionValidationTeacherComponent} from "./teacher-file/shared/section-validation-teacher/section-validation-teacher.component";
import {ManageTeacherRoutingModule} from "./manage-teacher.routing";

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
    SectionValidationTeacherComponent
  ]
})
export class ManageTeacherModule {
}
