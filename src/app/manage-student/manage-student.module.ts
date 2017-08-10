import {NgModule} from "@angular/core";
import {StudentRoutingModule} from "./manage-student.routing";
import {ListStudentComponent} from "./list-student/list-student.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    StudentRoutingModule
  ],
  declarations: [ListStudentComponent]
})
export class ManageStudentModule {
}
