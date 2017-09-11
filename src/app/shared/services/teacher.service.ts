/**
 * Created by Abbes on 08/09/2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {StorageService} from "./storage.service";
@Injectable()
export class TeacherService extends GenericService {
  constructor(private http: Http, private storageService: StorageService) {
    super();
  }

  getAllStudents() {
    const url = Config.baseUrl + '/admin/student';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllTeachersByStatus(requestedStatus: number) {
    const url = Config.baseUrl + '/admin/teacher/status/' + requestedStatus;
    console.log(url);
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  updateTeacherStatusAfterReview(teacherId: number, administrationReview: number) {
    const url = Config.baseUrl + '/admin/teacher/' + teacherId + '/status';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {
      administration_review: administrationReview
    }, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  deleteTeacher(studentId: number) {
    const url = Config.baseUrl + '/admin/teacher/' + studentId;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  sendMail(teacherId: number, content: string) {
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/mail/" + teacherId;

    return this.http.post(url, {"content": content},
      {
        headers: this.headers
      }
    )
      .catch(this.handleErrors);

  }

  getTeacherById(teacherId: number) {
    const url = Config.baseUrl + '/admin/teacher/' + teacherId;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);

  }

  getTeacherDetail(studentId: number) {
    const url = Config.baseUrl + '/admin/teacher/' + studentId + "/detail";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

}
