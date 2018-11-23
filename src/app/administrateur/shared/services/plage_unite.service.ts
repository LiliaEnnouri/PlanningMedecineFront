import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Plage_Unite} from "../models/Plage_Unite";
import {StorageService} from "./storage.service";
import {Config} from "../config";
import {catchError} from "rxjs/operators";
import {GenericService} from "./generic.service";

@Injectable()
export class PlageUniteService extends GenericService {
  headers: HttpHeaders;

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }

  addPlages(plages: Plage_Unite[]) {

    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(Config.baseUrl + "/plageUnite/addPlages", plages);
  }

  editPlages(plages: Plage_Unite[], uniteId: number) {

    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(Config.baseUrl + "/plageUnite/editPlages/" + uniteId, plages);
  }

  getPlageById(plageUniteId: number) {

    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(Config.baseUrl + "/plageUnite/" + plageUniteId, {headers});
  }

  getAllPlagesByNiveau(niveauId) {
    const url = Config.baseUrl + '/plageUnite/niveau/' + niveauId;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getAllPlagesByUnite(uniteId) {
    const url = Config.baseUrl + '/plageUnite/unite/' + uniteId;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }
}
