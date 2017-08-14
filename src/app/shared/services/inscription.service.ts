import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Http} from '@angular/http';
import {Config} from '../config';
import {Student} from "../models/student";
@Injectable()
export class InscriptionService extends GenericService {

  constructor(private http: Http) {
    super();
  }


  getAllCountries() {
    const url = Config.baseUrl + "/geo/countries";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getCitiesByCountry(countryId: string) {
    const url = Config.baseUrl + "/geo/countries/" + countryId + "/cities";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

}
