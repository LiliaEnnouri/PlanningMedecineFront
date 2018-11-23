import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Config} from "../../../shared/config";
import {catchError} from "rxjs/operators";
import {StorageService} from "../../../shared/services/storage.service";
import {GenericService} from "../../../shared/services/generic.service";
import {Unite} from "../models/Unite";

@Injectable()
export class UniteService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }


  getAllUnitesByNiveau(niveauId: any) {
    const url = Config.baseUrl + '/unite/niveau/' + niveauId;
    console.log(url);
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getUniteById(uniteId) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(Config.baseUrl + "/unite/" + uniteId, {headers});
  }

}
