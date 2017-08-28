import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {StorageService} from "./storage.service";
@Injectable()
export class StudentService extends GenericService {
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

  getAllStudentsByStatus(requestedStatus: number) {
    const url = Config.baseUrl + '/admin/student/status/' + requestedStatus;
    console.log(url);
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  updateStudentStatusAfterReview(studentId: number, administrationReview: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId + '/status';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {
      administration_review: administrationReview
    }, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  deleteStudent(studentId: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  sendMail(studentId: number, content: string) {
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/mail/" + studentId;

    return this.http.post(url, {"content": content},
      {
        headers: this.headers
      }
    )
      .catch(this.handleErrors);

  }

  getStudentById(studentId: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);

  }

  getStudentDetail(studentId: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId + "/detail";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

}
