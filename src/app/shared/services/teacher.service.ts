/**
 * Created by Abbes on 08/09/2017.
 */
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {StorageService} from "./storage.service";
@Injectable()
export class TeacherService extends GenericService {
    constructor(private http:HttpClient, private storageService:StorageService) {
        super();
    }

    getAllStudents() {
        const url = Config.baseUrl + '/admin/student';
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    getAllTeachersByStatus(requestedStatus:number) {
        const url = Config.baseUrl + '/admin/teacher/status/' + requestedStatus;
        console.log(url);
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    updateTeacherStatusAfterReview(teacherId:number, administrationReview:number) {
        const url = Config.baseUrl + '/admin/teacher/' + teacherId + '/status';
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.post<any>(url, {
            administration_review: administrationReview
        }, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    deleteTeacher(studentId:number) {
        const url = Config.baseUrl + '/admin/teacher/' + studentId;
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.delete(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }


    sendMail(teacherId:number, content:string) {
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        const url = Config.baseUrl + "/admin/mail/" + teacherId;

        return this.http.post<any>(url, {"content": content},
            {
                headers: headers
            }
        ).pipe(catchError(this.handleErrors));

    }

    getTeacherById(teacherId:number) {
        const url = Config.baseUrl + '/admin/teacher/' + teacherId;
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));

    }

    getTeacherDetail(studentId:number) {
        const url = Config.baseUrl + '/admin/teacher/' + studentId + "/detail";
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

}
