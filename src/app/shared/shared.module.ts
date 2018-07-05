import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgBusyModule} from "ng-busy";
import {StorageService} from "./services/storage.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgBusyModule],
    exports: [
        CommonModule,
        FormsModule],
    declarations: [],
    providers: [StorageService]
})
export class SharedModule {

}
