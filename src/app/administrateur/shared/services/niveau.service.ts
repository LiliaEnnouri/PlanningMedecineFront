import {HttpClient} from "@angular/common/http";
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {StorageService} from "./storage.service";
import {Injectable} from "@angular/core";

@Injectable()
export class NiveauService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }


  getNiveauById(niveauId) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(Config.baseUrl + "/niveau/" + niveauId, {headers});
  }

}
