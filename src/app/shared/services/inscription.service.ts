import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {Config} from '../config';
import {Student} from "../models/student";
import {RegistrationYearUniversity} from "../models/RegistrationYearUniversity";
import {StorageService} from "./storage.service";
@Injectable()
export class InscriptionService extends GenericService {

  constructor(private http: HttpClient, private stoarageService: StorageService) {
    super();
  }




  openInscription(registrationYear: RegistrationYearUniversity) {
    const headers = this.headers.set("Authorization", "Bearer " + this.stoarageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/registration/university-year/open";

    return this.http.post<any>(url, registrationYear,
      {
        headers: headers
      }
    ).pipe(catchError(this.handleErrors));
  }

  getCurrentInscription(year_university: string) {
    const headers = this.headers.set("Authorization", "Bearer " + this.stoarageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/registration/university-year/get";

    return this.http.post<any>(url, {
        year_university: year_university
      },
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));;
  }
}
