import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {GenericService} from "./generic.service";
import {StorageService} from "./storage.service";
import {Config} from "../config";
@Injectable()
export class TypeService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }


  getAllTypes() {
    const url = Config.baseUrl + '/type' ;
    console.log(url);
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }
}
