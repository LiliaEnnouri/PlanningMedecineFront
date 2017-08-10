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

  updateStudentStatusAfterReview(studentId: number, administrationReview: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId + '/status';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {
      status: 3,
      administration_review: administrationReview
    }, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  deleteStudent(studentId: number) {
    const url = Config.baseUrl + '/admin/student/' + studentId + '/status';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
