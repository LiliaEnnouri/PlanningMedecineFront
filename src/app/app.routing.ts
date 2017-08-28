import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {FullLayoutComponent} from "./layouts/full-layout.component";
import {NotFoundComponent} from "./error/not-found/not-found.component";

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
        path: 'notification',
        loadChildren: "./manage-notification/manage-notification.module#ManageNotificationModule"
      }, {
        path: 'inscriptions',
        loadChildren: "./inscriptions/inscriptions.module#InscriptionsModule"
      }, {
        path: 'error',
        loadChildren: "./error/error.module#ErrorModule"
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
