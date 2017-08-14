import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http} from "@angular/http";
import {Config} from "../config";

@Injectable()
export class AdminService extends GenericService {

  constructor(private http: Http, private storageService: StorageService) {
    super();
  }


  startReviewingStudents() {
    const url = Config.baseUrl + '/admin/review/start';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {}, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  finishReviewingStudents() {
    const url = Config.baseUrl + '/admin/review/finish';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {}, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
