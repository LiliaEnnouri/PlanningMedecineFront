import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Config} from "../config";
import {GenericService} from "./generic.service";
import {StorageService} from "./storage.service";

@Injectable()
export class ThemeService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }


  getAllThemesByUnite(uniteId: number) {
    const url = Config.baseUrl + '/theme/unite/' + uniteId;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }



  definirOrdre(themes: number[]) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(Config.baseUrl + "/theme/definirOrdre", themes);
  }

  getThemeById(themeId: number) {

    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(Config.baseUrl + "/theme/" + themeId, {headers});
  }
}
