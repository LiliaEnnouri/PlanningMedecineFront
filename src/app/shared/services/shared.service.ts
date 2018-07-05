/**
 * Created by Abbes on 08/09/2017.
 */
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import {Config} from "../config";
import {StorageService} from "./storage.service";
import {City} from "../models/city";
import {Observable} from "rxjs/Observable";
import {Country} from "../models/country";

@Injectable()
export class SharedService extends GenericService {

    constructor(private http:HttpClient, private storageService:StorageService) {
        super();
    }


    getAllTypes() {
        const url = Config.baseUrl + "/types";
        const headers = this.headers;
        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    getAllMentions() {
        const url = Config.baseUrl + "/mentions";
        const headers = this.headers;
        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    getAllResults() {
        const url = Config.baseUrl + "/results";
        const headers = this.headers;
        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    getAllUniversities() {
        const url = Config.baseUrl + "/universities";
        const headers = this.headers;
        return this.http.get<any>(url,
            {
                headers: headers
            })
            .pipe(catchError(this.handleErrors));
    }

    getAllLevels() {
        const url = Config.baseUrl + "/levels";
        const headers = this.headers;
        return this.http.get<any>(url,
            {
                headers: headers
            })
            .pipe(catchError(this.handleErrors));
    }

    getAllGrades() {
        const url = Config.baseUrl + "/grades";
        const headers = this.headers;
        return this.http.get<any>(url,
            {
                headers: headers
            })
            .pipe(catchError(this.handleErrors));
    }

    getAllHopitaux() {
        const url = Config.baseUrl + "/hopitaux";
        const headers = this.headers;
        return this.http.get<any>(url,
            {
                headers: headers
            })
            .pipe(catchError(this.handleErrors));
    }

    getAllServices() {
        const url = Config.baseUrl + "/services";
        const headers = this.headers;
        return this.http.get<any>(url,
            {
                headers: headers
            })
            .pipe(catchError(this.handleErrors));
    }


    getAllCredits() {
        const url = Config.baseUrl + "/credits";
        const headers = this.headers;
        return this.http.get<any>(url,
            {
                headers: headers
            })
            .pipe(catchError(this.handleErrors));
    }

    getAllCountries():Observable<Country[]> {
        const url = Config.baseUrl + "/geo/countries";
        const countries = this.getAllCountriesFromStorage();
        const headers = this.headers;
        if (countries) {
            return Observable.create(observer => {
                observer.next(countries);
                observer.complete();
            })
        } else {
            return this.http.get<any>(url, {
                headers: headers
            }).pipe(map(res => {
                const data = res.json();
                this.saveAllCountriesFromStorage(data);
                return data;
            }), catchError(this.handleErrors));
        }
    }

    getCitiesByCountry(countryId:string):Observable<City[]> {
        const url = Config.baseUrl + "/geo/countries/" + countryId + "/cities";
        const tunisCities = this.getTunisCitiesFromStorage();
        const headers = this.headers;
        if (countryId.localeCompare('TUN') === 0 && tunisCities) {
            return Observable.create(observer => {
                observer.next(tunisCities);
                observer.complete();
            })
        } else {
            return this.http.get<any>(url, {
                headers: headers
            }).pipe(
                map(res => {
                    const data = res.json();
                    if (countryId.localeCompare('TUN') === 0) {
                        this.saveTunisCitiesFromStorage(data);
                    }
                    return data;
                }), catchError(this.handleErrors));
        }
    }

    getAllFonctionTypes() {
        const url = Config.baseUrl + "/fonction_types";
        const headers = this.headers;
        return this.http.get<any>(url, {
            headers: headers
        })
            .pipe(catchError(this.handleErrors));
    }

    getAllCountriesFromStorage() {
        return <Array<Country>> this.storageService.read('countries');
    }

    saveAllCountriesFromStorage(countries:Array<Country>) {
        this.storageService.write('countries', countries);
    }

    getTunisCitiesFromStorage() {
        return <Array<City>> this.storageService.read('tunis-cities');
    }

    saveTunisCitiesFromStorage(cities:Array<City>) {
        this.storageService.write('tunis-cities', cities);
    }

}
