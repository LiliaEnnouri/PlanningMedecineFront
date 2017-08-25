/**
 * Created by Abbes on 25/08/2017.
 */
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {InscriptionsModuleRouting} from "./inscriptions.routing";
import {InscriptionYearUniversityComponent} from "./inscription-year-university/inscription-year-university.component";
import {ListInscritComponent} from "./list-inscrit/list-inscrit.component";

@NgModule({
  imports: [
    InscriptionsModuleRouting,
    SharedModule,
  ],
  declarations: [
    InscriptionYearUniversityComponent,
    ListInscritComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class InscriptionsModule {
}
