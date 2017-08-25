import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {BoiteMessagesComponent} from "./boite-messages.component";
import {AllMessagesComponent} from "./all-messages/all-messages.component";
import {MessagesModuleRouting} from "./messages.routing";
import {AllMessagesActivesComponent} from "./all-messages-actives/all-messages-actives.component";
import {AllMessagesClosedComponent} from "./all-messages-closed/all-messages-closed.component";
import {DetailsDiscussionComponent} from "./detail-discussion/details-discussion.component";
import {ComposeMessageComponent} from "./compose-message/compose-message.component";

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
    DetailsDiscussionComponent,
    ComposeMessageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class MessagesModule {
}
