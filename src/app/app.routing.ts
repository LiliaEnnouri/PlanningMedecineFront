import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {FullLayoutComponent} from "./layouts/full-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'student',
        loadChildren: "./manage-student/manage-student.module#ManageStudentModule"
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
