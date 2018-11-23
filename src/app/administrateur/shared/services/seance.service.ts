import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Config} from "../config";
import {GenericService} from "./generic.service";
import {StorageService} from "./storage.service";

@Injectable()
export class SeanceService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }
  getAllSeances() {
    const url = Config.baseUrl + '/seance/getAll';
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }


  getAllSeancesByUnite(uniteId: number) {
    const url = Config.baseUrl + '/seance/unite/' + uniteId;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getAllSeancesByEnseignant(enseignantId: number) {
    const url = Config.baseUrl + '/seance/enseignant/' + enseignantId;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getAllSeancesByNiveau(niveauId: number) {
    const url = Config.baseUrl + '/seance/niveau/' + niveauId;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }



  definirOrdre(seances: number[]) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(Config.baseUrl + "/seance/definirOrdre", seances);
  }
}
