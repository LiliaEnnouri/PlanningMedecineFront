import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {StorageService} from "../../../shared/services/storage.service";
import {GenericService} from "../../../shared/services/generic.service";
import {Config} from "../config";

@Injectable()
export class EnseignantService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }


  getUnites(enseignantId: number) {
    const url = Config.baseUrl + '/enseignant/unites/' + enseignantId;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getEnseignantById(enseignantId) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(Config.baseUrl + "/enseignant/" + enseignantId, {headers});
  }



}
