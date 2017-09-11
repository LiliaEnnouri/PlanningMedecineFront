import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Http} from '@angular/http';
import {Config} from '../config';
import {Student} from "../models/student";
import {RegistrationYearUniversity} from "../models/RegistrationYearUniversity";
import {StorageService} from "./storage.service";
@Injectable()
export class InscriptionService extends GenericService {

  constructor(private http: Http, private stoarageService: StorageService) {
    super();
  }




  openInscription(registrationYear: RegistrationYearUniversity) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/registration/university-year/open";

    return this.http.post(url, registrationYear,
      {
        headers: this.headers
      }
    )
      .catch(this.handleErrors);
  }

  getCurrentInscription(year_university: string) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/registration/university-year/get";

    return this.http.post(url, {
        year_university: year_university
      },
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
