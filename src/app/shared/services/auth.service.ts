import {Http} from "@angular/http";
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {Injectable} from "@angular/core";
import {Credentials} from "../models/credentials";
import {StorageService} from "./storage.service";
import {Student} from "app/shared/models/student";


@Injectable()
export class AuthService extends GenericService {

  constructor(private http: Http, private stoarageService: StorageService) {
    super();
  }


  login(credentials: Credentials) {
    const url = Config.baseUrl + '/auth/login/admin';
    console.log("login", JSON.stringify(credentials));
    return this.http.post(url, credentials, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  registration(student: Student) {

  }

  isLoggedIn() {
    return this.stoarageService.read("token") != null;
  }

}
