import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http} from "@angular/http";
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

  constructor(private http: Http, private storageService: StorageService) {
    super();
  }

  editInformations(teacher: Teacher) {
    const url = Config.baseUrl + "/admin/teacher/" + teacher.id_Teacher + "/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("teacher-token"));
    return this.http.put(url, teacher,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editBacInformation(bac: Bac, id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/bac/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("teacher-token"));
    return this.http.put(url, bac,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editFonctionInformation(fonctions: Fonction[], id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/fonctions/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("teacher-token"));
    return this.http.put(url, fonctions, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editDoctaurat(doctaurat: Doctaurat, id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/doctaurat/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(url, doctaurat,

      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editResidanatInformation(residanat: Residanat, id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/edit-residanat";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(url, residanat, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  submitAdmin(sectionIds: number[]) {
    const url = Config.baseUrl + "/teacher/me/submitForReview";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("teacher-token"));
    return this.http.post(url, sectionIds,
      {
        headers: this.headers
      }
    )
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  removeDoctaurat(id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/doctaurat/remove";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("teacher-token"));
    return this.http.delete(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  editConcours(concour: TeacherConcour, id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/concour/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("teacher-token"));
    return this.http.put(url, concour, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  removeConcour(concourType: number, id_Teacher: number) {
    const url = Config.baseUrl + "/admin/teacher/" + id_Teacher + "/concour/" + concourType + "/remove";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("teacher-token"));
    return this.http.delete(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
