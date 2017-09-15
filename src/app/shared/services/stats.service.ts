/**
 * Created by Abbes on 15/09/2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {StorageService} from "./storage.service";
@Injectable()
export class StatsService extends GenericService {
  constructor(private http: Http, private storageService: StorageService) {
    super();
  }

  getGeneralStatsStudentFile() {
    const url = Config.baseUrl + "/stats/generalStatsStudentFile";


    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
