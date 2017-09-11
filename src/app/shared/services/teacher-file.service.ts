/**
 * Created by Abbes on 08/09/2017.
 */
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http, ResponseContentType} from "@angular/http";
import {Config} from "../config";
import {Student} from "../models/student";
import {StorageService} from "./storage.service";
import {Bac} from "app/shared/models/bac";
import {Fonction} from "../models/fonction";
import {Doctaurat} from "../models/doctaurat";
import {Residanat} from "../models/residanat";
import {Teacher} from "../models/Teacher";
@Injectable()
export class TeacherFileService extends GenericService {

  constructor(private http: Http, private storageService: StorageService) {
    super();
  }


  editInformations(teacher: Teacher) {
    const url = Config.baseUrl + "/admin/teacher/" + teacher.id_Teacher + "/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(url, teacher,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  submitAdmin() {
    const url = Config.baseUrl + "/student/me/submitForReview";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {},
      {
        headers: this.headers
      }
    )
      .map(res => res.json())
      .catch(this.handleErrors);
  }

}
