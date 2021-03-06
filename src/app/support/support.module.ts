import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {SupportModuleRouting} from "./support.routing";
import {BoiteReclamationComponent} from "./boite-reclamation/boite-reclamation.component";

import {MessagesModule} from "./boite-messages/messages.module";
import {ReclamationVayetekComponent} from "./reclamation-vayetek/reclamation-vayetek.component";

@NgModule({
  imports: [
    SupportModuleRouting,
    SharedModule,
    MessagesModule
  ],
  declarations: [
    BoiteReclamationComponent,
    ReclamationVayetekComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class SupportModule {
}
