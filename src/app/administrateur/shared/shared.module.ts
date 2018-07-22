import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {StorageService} from "./services/storage.service";
import {NgBusyModule} from "ng-busy";
import {MomentModule} from "ngx-moment";
import {SharedService} from "./services/shared.service";

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
export class SharedModule { }
