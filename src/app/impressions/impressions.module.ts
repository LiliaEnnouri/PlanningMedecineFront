/**
 * Created by Abbes on 25/08/2017.
 */
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ImpressionsModuleRouting} from "./impressions.routing";
import {ImpressionInscriptionComponent} from "./inscription/impression-inscription.component";

@NgModule({
  imports: [
    ImpressionsModuleRouting,
    SharedModule,
  ],
  declarations: [
    ImpressionInscriptionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class ImpressionsModule {
}
