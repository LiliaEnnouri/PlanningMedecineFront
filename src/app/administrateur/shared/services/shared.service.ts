import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../../shared/config";
import {catchError} from "rxjs/operators";
import {GenericService} from "./generic.service";
import {StorageService} from "./storage.service";

@Injectable()
export class SharedService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }

  getNiveaux() {
    const url = Config.baseUrl + "/niveau/getAll";
    const headers = this.headers;
    return this.http.get<any>(url,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }
}
