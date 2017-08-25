import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotificationRoutingModule} from "./manage-notification.routing";
import {SharedModule} from "../shared/shared.module";
import { ListNotificationComponent } from './list-notification/list-notification.component';
import { AddNotificationComponent } from './add-notification/add-notification.component';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SharedModule
  ],
  declarations: [ListNotificationComponent, AddNotificationComponent]
})
export class ManageNotificationModule {
}
