import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListStudentComponent} from "./list-student/list-student.component";
import {DetailStudentComponent} from "./detail-student/detail-student.component";
import {EditStudentComponent} from "./edit-student/edit-student.component";
import {VerificationListStudentComponent} from "./verification-list-student/verification-list-student.component";

export const routes: Routes = [
  {
    path: 'list-valid',
    component: ListStudentComponent,
  }, {
    path: 'list-current',
    component: ListStudentComponent,
  }, {
    path: ':studentId/detail',
    component: DetailStudentComponent,
  }, {
    path: ':studentId/edit',
    component: EditStudentComponent,
  }, {
    path: 'verification-list',
    component: VerificationListStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageStudentRoutingModule {
}
