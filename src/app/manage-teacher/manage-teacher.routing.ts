import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListTeacherComponent} from "./list-teacher/list-teacher.component";
import {EditTeacherComponent} from "./edit-teacher/edit-teacher.component";

export const routes: Routes = [
  {
    path: 'list-valid',
    component: ListTeacherComponent,
  }, {
    path: 'list-current',
    component: ListTeacherComponent,
  }, /*{
   path: ':teacherId/detail',
   component: DetailStudentComponent,
   },*/
  {
    path: ':teacherId/edit',
    component: EditTeacherComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTeacherRoutingModule {
}
