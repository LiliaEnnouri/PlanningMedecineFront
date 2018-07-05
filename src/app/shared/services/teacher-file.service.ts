import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {Config} from "../config";
import {StorageService} from "./storage.service";
import {Bac} from "app/shared/models/bac";
import {Fonction} from "../models/fonction";
import {Doctaurat} from "../models/doctaurat";
import {Residanat} from "../models/residanat";
import {Teacher} from "../models/Teacher";
import {TeacherConcour} from "../models/Teacher_Concour";
@Injectable()
export class TeacherFileService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }

  editInformations(teacher: Teacher) {
    const url = Config.baseUrl + "/admin/teacher/" + teacher.id_Teacher + "/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, teacher,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  editBacInformation(bac: Bac, id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/bac/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, bac,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  editFonctionInformation(fonctions: Fonction[], id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/fonctions/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, fonctions, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  editDoctaurat(doctaurat: Doctaurat, id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/doctaurat/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, doctaurat,

      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  editResidanatInformation(residanat: Residanat, id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/edit-residanat";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, residanat, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  submitAdmin(sectionIds: number[]) {
    const url = Config.baseUrl + "/teacher/me/submitForReview";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url, sectionIds,
      {
        headers: headers
      }
    )
      .pipe(catchError(this.handleErrors));
  }


  removeDoctaurat(id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/doctaurat/remove";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }


  editConcours(concour: TeacherConcour, id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/concour/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, concour, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  removeConcour(concourType: number, id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/concour/" + concourType + "/remove";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete<Teacher>(url,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  changeStatusFileTeacher(teacherId: number, status: number) {
    const url = Config.baseUrl + "/admin/teacher/" + teacherId + "/status-file/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url,
      {
        status: status
      },
      {
        headers: headers
      }
    )
      .pipe(catchError(this.handleErrors));
  }
}
