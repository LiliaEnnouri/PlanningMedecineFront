import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgBusyModule} from "ng-busy";
import {StorageService} from "./services/storage.service";
import {MomentModule} from "ngx-moment";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgBusyModule,
    MomentModule],
  exports: [
    CommonModule,
    FormsModule,
    NgBusyModule,
    MomentModule],
  declarations: [],
  providers: [StorageService]
})
export class SharedModule {

}
