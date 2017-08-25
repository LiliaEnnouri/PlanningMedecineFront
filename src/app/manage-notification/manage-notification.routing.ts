import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListNotificationComponent} from "./list-notification/list-notification.component";
import {AddNotificationComponent} from "./add-notification/add-notification.component";

export const routes: Routes = [
  {
    path: 'list',
    component: ListNotificationComponent
  }, {
    path: 'add',
    component: AddNotificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {
}
