import {NgModule} from "@angular/core";
import {BusyModule} from "angular2-busy";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {StorageService} from "./services/storage.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BusyModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    BusyModule,
  ],
  declarations: [],
  providers: [StorageService]
})
export class SharedModule {

}
