import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {Injectable} from "@angular/core";
import {Credentials} from "../models/credentials";
import {StorageService} from "./storage.service";
import {Student} from "app/shared/models/student";


@Injectable()
export class AuthService extends GenericService {

  constructor(private http: HttpClient, private stoarageService: StorageService) {
    super();
  }


  login(credentials: Credentials) {
    const url = Config.baseUrl + '/auth/login';
    console.log("login", JSON.stringify(credentials));
    const headers = this.headers;
    return this.http.post<any>(url, credentials, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }


  registration(student: Student) {

  }

  isLoggedIn() {
    return this.stoarageService.read("token") != null;
  }

}
