import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListStudentComponent} from "./list-student/list-student.component";

export const routes: Routes = [
  {
    path: 'list',
    component: ListStudentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
