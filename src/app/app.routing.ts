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
      },
      {
        path: 'support',
        loadChildren: "./support/support.module#SupportModule"
      },
      {
        path: 'inscriptions',
        loadChildren: "./inscriptions/inscriptions.module#InscriptionsModule"
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
