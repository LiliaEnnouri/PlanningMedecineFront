import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {StorageService} from "./storage.service";

@Injectable()
export class StudentService extends GenericService {
  constructor(private http: HttpClient, private storageService: StorageService) {
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

  getAllStudentsByStatus( requestedStatus: number) {
    const url = Config.baseUrl + '/admin/student/status/' + requestedStatus;
    console.log(url);
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  updateStudentStatusAfterReview(studentId: number, administrationReview: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId + '/status';
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url, {
      administration_review: administrationReview
    }, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  deleteStudent(studentId: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }


  sendMail(studentId: number, content: string) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/mail/" + studentId;

    return this.http.post<any>(url, {"content": content},
      {
        headers: headers
      }
    ).pipe(catchError(this.handleErrors));

  }

  getStudentById(studentId: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));

  }

  getStudentDetail(studentId: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId + "/detail";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getAllStudentsByLevel(requestedStatus: number, levelId: number) {
    const url = Config.baseUrl + '/admin/student/status/' + requestedStatus;
    console.log(url);
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url, {
      levelId: levelId
    }, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getLevelStudent(studentId: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId + '/level';
    console.log(url);
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }
}
