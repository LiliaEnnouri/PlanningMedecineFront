import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";

export const routes: Routes = [
  {
    path: 'not-found',
    component: NotFoundComponent
  }, {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {
}
