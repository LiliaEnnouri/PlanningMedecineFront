import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Config} from "../config";
import {GenericService} from "./generic.service";
import {StorageService} from "./storage.service";
import {Plage_Unite} from "../models/Plage_Unite";
import {Ressource} from "../models/Ressource";

@Injectable()
export class RessourceService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }


  getAllRessourcesByTheme(themeId: number) {
    const url = Config.baseUrl + '/ressource/theme/' + themeId;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  editRessourcesTheme(Ressources: Ressource[], themeId: number) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(Config.baseUrl + "/ressource/editRessources" + themeId, Ressources);
  }


}
