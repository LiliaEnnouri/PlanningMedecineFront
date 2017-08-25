import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http} from "@angular/http";
import {Admin} from "../models/admin";
import {Config} from "../config";

@Injectable()
export class UserService extends GenericService {
  loggedAdmin: Admin;

  constructor(private http: Http, private storageService: StorageService) {
    super();
    this.loggedAdmin = <Admin> storageService.read('admin');
  }

  getLoggedAdmin() {
    this.headers.set("Authorization", "Bearer " + this.getTokent());
    const url = Config.baseUrl + "/admin/me";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getTokent() {
    return <string>this.storageService.read("admin-token")
  }
}
