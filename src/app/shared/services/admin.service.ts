import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http, ResponseContentType} from "@angular/http";
import {Config} from "../config";

@Injectable()
export class AdminService extends GenericService {


  constructor(private http: Http, private storageService: StorageService) {
    super();

  }


  startReviewingStudents() {
    const url = Config.baseUrl + '/admin/review/start';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {}, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  finishReviewingStudents() {
    const url = Config.baseUrl + '/admin/review/finish';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {}, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  changeSectionStatus(id_student: number, id_section: number, status: number, note?: string) {
    const url = Config.baseUrl + '/admin/student/' + id_student + '/update-status-section';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {
      id_section: id_section,
      status: status,
      note: note
    }, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  changeSectionTeacherStatus(id_teacher: number, id_section: number, status: number, note?: string) {
    const url = Config.baseUrl + '/admin/teacher/' + id_teacher + 'update-status-section';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {
      id_section: id_section,
      status: status,
      note: note
    }, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getListInscritStudents() {
    const url = Config.baseUrl + '/admin/registration/university-year/list-student';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getListInscritStudentsByLevel(levelId) {
    const url = Config.baseUrl + '/admin/registration/university-year/list-student/level/' + levelId;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  generatePDFStudent(studentId: number) {
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/" + studentId + "/generateDetailPDF";

    return this.http.get(url, {
      headers: this.headers,
      responseType: ResponseContentType.Blob
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  getAdminByPrivileges(privilege_id: number) {
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/privilege/" + privilege_id;

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  generateStudentsExcel() {
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/excel";
    return this.http.get(url, {
      headers: this.headers,
      responseType: ResponseContentType.Blob

    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  affectScholarToStudent(studentId: number, adminId: number) {
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/" + studentId + "/affectScholar/" + adminId;
    return this.http.post(url, {}, {
      headers: this.headers,
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllStudentsByLevel(requestedStatus: number, levelId: number) {

  }
}
