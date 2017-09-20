/**
 * Created by Abbes on 08/09/2017.
 */
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http} from "@angular/http";
import {Config} from "../config";
import {StorageService} from "./storage.service";
import {City} from "../models/city";
import {Observable} from "rxjs/Observable";
import {Country} from "../models/country";
@Injectable()
export class SharedService extends GenericService {

  constructor(private http: Http, private storageService: StorageService) {
    super();
  }


  getAllTypes() {
    const url = Config.baseUrl + "/types";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllMentions() {
    const url = Config.baseUrl + "/mentions";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllResults() {
    const url = Config.baseUrl + "/results";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllUniversities() {
    const url = Config.baseUrl + "/universities";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllLevels() {
    const url = Config.baseUrl + "/levels";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  getAllSpecialities() {
    const url = Config.baseUrl + "/specialities";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllHopitaux() {
    const url = Config.baseUrl + "/hopitaux";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllServices() {
    const url = Config.baseUrl + "/services";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  getAllCredits() {
    const url = Config.baseUrl + "/credits";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllCountries(): Observable<Country[]> {
    const url = Config.baseUrl + "/geo/countries";
    const countries = this.getAllCountriesFromStorage();
    if (countries) {
      console.log('get countries from locale');
      return Observable.create(observer => {
        observer.next(countries);
        observer.complete();
      })
    } else {
      console.log('get countries from APIs 1 ');
      return this.http.get(url, {
        headers: this.headers
      })
        .map(res => {
          const data = res.json();
          this.saveAllCountriesFromStorage(data);
          console.log("get countries from APIs 2 ");
          return data;
        })
        .catch(this.handleErrors);
    }
  }

  getCitiesByCountry(countryId: string): Observable<City[]> {
    const url = Config.baseUrl + "/geo/countries/" + countryId + "/cities";
    const tunisCities = this.getTunisCitiesFromStorage();
    if (countryId.localeCompare('TUN') === 0 && tunisCities) {
      console.log("getCitiesByCountryFromLocal");
      return Observable.create(observer => {
        observer.next(tunisCities);
        observer.complete();
      })
    } else {
      console.log("getCitiesByCountryFromRemote");
      return this.http.get(url, {
        headers: this.headers
      })
        .map(res => {
          console.log('remote response');
          const data = res.json();
          if (countryId.localeCompare('TUN') === 0) {
            this.saveTunisCitiesFromStorage(data);
          }
          return data;
        })
        .catch(this.handleErrors);
    }
  }

  getAllFonctionTypes() {
    const url = Config.baseUrl + "/fonction_types";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllCountriesFromStorage() {
    return <Array<Country>> this.storageService.read('countries');
  }

  saveAllCountriesFromStorage(countries: Array<Country>) {
    this.storageService.write('countries', countries);
  }

  getTunisCitiesFromStorage() {
    return <Array<City>> this.storageService.read('tunis-cities');
  }

  saveTunisCitiesFromStorage(cities: Array<City>) {
    this.storageService.write('tunis-cities', cities);
  }

  getAllGrades() {
    const url = Config.baseUrl + "/grades";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
