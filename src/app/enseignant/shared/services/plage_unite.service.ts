import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Plage_Unite} from "../models/Plage_Unite";
import {StorageService} from "./storage.service";
import {Config} from "../config";
import {GenericService} from "../../../administrateur/shared/services/generic.service";

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

  getPlageById(plageUniteId: number) {

    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(Config.baseUrl + "/plageUnite/" + plageUniteId, {headers});
  }
}
