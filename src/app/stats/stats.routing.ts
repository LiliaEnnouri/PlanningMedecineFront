import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {StatsStudentFileComponent} from "./student-file/stats-student-file.component";

export const routes: Routes = [
  {
    path: 'student-file',
    component: StatsStudentFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsModuleRouting {
}
