import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {SupportModuleRouting} from "./support.routing";
import {BoiteReclamationComponent} from "./boite-reclamation/boite-reclamation.component";


/**
 * Created by AHMED on 03/08/2017.
 */
@NgModule({
  imports: [
    SupportModuleRouting,
    SharedModule
  ],
  declarations: [
  BoiteReclamationComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class SupportModule {
}
