import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {FullLayoutComponent} from "./layouts/full-layout.component";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {ManageStudentModule} from "./manage-student/manage-student.module";
import {ManageTeacherModule} from "./manage-teacher/manage-teacher.module";
import {SupportModule} from "./support/support.module";
import {ManageNotificationModule} from "./manage-notification/manage-notification.module";
import {InscriptionsModule} from "./inscriptions/inscriptions.module";
import {ImpressionsModule} from "./impressions/impressions.module";
import {StatsModule} from "./stats/stats.module";
import {ErrorModule} from "./error/error.module";

export function loadManageStudentModule() {
    return ManageStudentModule
}

export function loadManageTeacherModule() {
    return ManageTeacherModule
}

export function loadSupportModule() {
    return SupportModule
}

export function loadManageNotificationModule() {
    return ManageNotificationModule
}

export function loadInscriptionsModule() {
    return InscriptionsModule
}

export function loadImpressionsModule() {
    return ImpressionsModule
}

export function loadStatsModule() {
    return StatsModule
}

export function loadErrorModule() {
    return ErrorModule
}

export const routes:Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            {
                path: 'student',
                loadChildren: loadManageStudentModule
            },
            {
                path: 'teacher',
                loadChildren: loadManageTeacherModule
            },
            {
                path: 'support',
                loadChildren: loadSupportModule
            },
            {
                path: 'notification',
                loadChildren: loadManageNotificationModule
            }, {
                path: 'inscriptions',
                loadChildren: loadInscriptionsModule
            },
            {
                path: 'impressions',
                loadChildren: loadImpressionsModule
            },
            {
                path: 'stats',
                loadChildren: loadStatsModule
            }, {
                path: 'error',
                loadChildren: loadErrorModule
            }
        ],
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
