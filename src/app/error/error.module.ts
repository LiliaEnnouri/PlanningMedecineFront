import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotFoundComponent} from "./not-found/not-found.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {ErrorRoutingModule} from "./error.routing";

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule
  ],
  declarations: [NotFoundComponent,
    NotAuthorizedComponent],
  exports: [
    NotFoundComponent,
    NotAuthorizedComponent
  ]
})
export class ErrorModule {
}
