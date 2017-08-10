import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http} from "@angular/http";
import {Admin} from "../models/Admin";

@Injectable()
export class UserService extends GenericService {
  loggedUser: Admin;

  constructor(private http: Http, private storageService: StorageService) {
    super();
    this.loggedUser = <Admin> storageService.read('admin');
  }

  getTokent() {
    return <string>this.storageService.read("admin-token")
  }
}
