import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";

import {StatsModuleRouting} from "./stats.routing";
import {StatsStudentFileComponent} from "./student-file/stats-student-file.component";
import {StatBoxComponent} from "./shared/stat-box/stat-box.component";

@NgModule({
  imports: [
    StatsModuleRouting,
    SharedModule
  ],
  declarations: [
    StatsStudentFileComponent,
    StatBoxComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class StatsModule {
}
