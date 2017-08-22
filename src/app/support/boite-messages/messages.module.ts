import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {BoiteMessagesComponent} from "./boite-messages.component";
import {AllMessagesComponent} from "./all-messages/all-messages.component";
import {MessagesModuleRouting} from "./messages.routing";
import {AllMessagesActivesComponent} from "./all-messages-actives/all-messages-actives.component";
import {AllMessagesClosedComponent} from "./all-messages-closed/all-messages-closed.component";
import {DetailsDiscussionComponent} from "./detail-discussion/details-discussion.component";
import {ConversationService} from "../../shared/services/conversation.service";

@NgModule({
  imports: [
    MessagesModuleRouting,
    SharedModule
  ],
  declarations: [
    BoiteMessagesComponent,
    AllMessagesComponent,
    AllMessagesActivesComponent,
    AllMessagesClosedComponent,
    DetailsDiscussionComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ConversationService
  ]
})
export class MessagesModule {
}
