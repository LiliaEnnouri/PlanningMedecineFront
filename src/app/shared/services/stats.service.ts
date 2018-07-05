/**
 * Created by Abbes on 15/09/2017.
 */
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {StorageService} from "./storage.service";
@Injectable()
export class StatsService extends GenericService {
  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }

  getGeneralStatsStudentFile() {
    const url = Config.baseUrl + "/stats/generalStatsStudentFile";
    const headers = this.headers;

    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }
}
