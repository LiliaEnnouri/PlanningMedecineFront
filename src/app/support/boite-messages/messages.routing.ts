import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BoiteMessagesComponent} from "./boite-messages.component";
import {AllMessagesComponent} from "./all-messages/all-messages.component";
import {AllMessagesActivesComponent} from "./all-messages-actives/all-messages-actives.component";
import {AllMessagesClosedComponent} from "./all-messages-closed/all-messages-closed.component";
import {DetailsDiscussionComponent} from "./detail-discussion/details-discussion.component";


export const routes: Routes = [
  {
    path: '',
    component: BoiteMessagesComponent,
    children: [
      {
        path: ':user/all',
        component: AllMessagesComponent
      },
      {
        path: ':user/active',
        component: AllMessagesActivesComponent
      },
      {
        path: ':user/closed',
        component: AllMessagesClosedComponent
      },
      {
        path: ':conversationId/discussion',
        component: DetailsDiscussionComponent
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesModuleRouting {
}
