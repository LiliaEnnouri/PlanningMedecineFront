import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {BoiteMessagesComponent} from "./boite-messages.component";
import {AllMessagesComponent} from "./all-messages/all-messages.component";
import {MessagesModuleRouting} from "./messages.routing";
import {AllMessagesActivesComponent} from "./all-messages-actives/all-messages-actives.component";
import {AllMessagesClosedComponent} from "./all-messages-closed/all-messages-closed.component";
import {DetailsDiscussionComponent} from "./detail-discussion/details-discussion.component";


/**
 * Created by AHMED on 03/08/2017.
 */
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
  providers: []
})
export class MessagesModule {
}
