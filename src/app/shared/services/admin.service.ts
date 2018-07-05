import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {Config} from "../config";
import {StructuredDataType} from "../../manage-student/verification-list-student/verification-list-student.component";

@Injectable()
export class AdminService extends GenericService {


    constructor(private http:HttpClient, private storageService:StorageService) {
        super();

    }


    startReviewingStudents() {
        const url = Config.baseUrl + '/admin/review/start';
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.post<any>(url, {}, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    finishReviewingStudents() {
        const url = Config.baseUrl + '/admin/review/finish';
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.post<any>(url, {}, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    changeSectionStatus(id_student:number, id_section:number, status:number, note?:string) {
        const url = Config.baseUrl + '/admin/student/' + id_student + '/update-status-section';
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.post<any>(url, {
            id_section: id_section,
            status: status,
            note: note
        }, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    changeSectionTeacherStatus(id_teacher:number, id_section:number, status:number, note?:string) {
        const url = Config.baseUrl + '/admin/teacher/' + id_teacher + 'update-status-section';
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.post<any>(url, {
            id_section: id_section,
            status: status,
            note: note
        }, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    getListInscritStudents() {
        const url = Config.baseUrl + '/admin/registration/university-year/list-student';
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    getListInscritStudentsByLevel(levelId) {
        const url = Config.baseUrl + '/admin/registration/university-year/list-student/level/' + levelId;
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    generatePDFStudent(studentId:number) {
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        const url = Config.baseUrl + "/admin/student/" + studentId + "/generateDetailPDF";
        const options = {
            headers: headers,
            responseType: 'blob' as 'json'
        };
        return this.http.get<any>(url, options).pipe(catchError(this.handleErrors));
    }


    getAdminByPrivileges(privilege_id:number) {
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        const url = Config.baseUrl + "/admin/privilege/" + privilege_id;

        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    generateStudentsExcel() {
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        const url = Config.baseUrl + "/admin/student/excel";
        const options = {
            headers: headers,
            responseType: 'blob' as 'json'
        };
        return this.http.get<any>(url, options)
            .pipe(catchError(this.handleErrors));
    }

    affectScholarToStudent(studentId:number, adminId:number) {
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        const url = Config.baseUrl + "/admin/student/" + studentId + "/affectScholar/" + adminId;
        return this.http.post<any>(url, {}, {
            headers: headers,
        })
            .pipe(catchError(this.handleErrors));
    }

    changeSectionStatusTeacher(id_Teacher:number, id_Section:number, status:number, note:string) {
        const url = Config.baseUrl + '/admin/teacher/' + id_Teacher + '/update-status-section';
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        return this.http.post<any>(url, {
            id_section: id_Section,
            status: status,
            note: note
        }, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    getListInscritbyLevelExcel(selectedLevel:number) {
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        const url = Config.baseUrl + "/admin/registration/university-year/list-student/level/" + selectedLevel + "/excel";
        const options = {
            headers: headers,
            responseType: 'blob' as 'json'
        };
        return this.http.get<any>(url, options)
            .pipe(catchError(this.handleErrors));
    }

    generateListStudentProblem(data:StructuredDataType[]) {
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        const url = Config.baseUrl + "/admin/generateListProblemStudentExcel";
        const options = {
            headers: headers,
            responseType: 'blob' as 'json'
        };
        return this.http.post<any>(url, JSON.stringify(data),
            options
        )
            .pipe(catchError(this.handleErrors));
    }

    generateStudentFile(selectedLevel:number) {
        const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
        const url = Config.baseUrl + "/admin/student/student-files-level/" + selectedLevel;
        const options = {
            headers: headers,
            responseType: 'blob' as 'json'
        };
        return this.http.get<any>(url, options
        )
            .pipe(catchError(this.handleErrors));
    }
}
