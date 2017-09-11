/**
 * Created by Abbes on 08/09/2017.
 */
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http, ResponseContentType} from "@angular/http";
import {Config} from "../config";
import {Student} from "../models/student";
import {StorageService} from "./storage.service";
import {Bac} from "app/shared/models/bac";
import {Fonction} from "../models/fonction";
import {Doctaurat} from "../models/doctaurat";
import {Residanat} from "../models/residanat";
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


  getAllFonctionTypes() {
    const url = Config.baseUrl + "/fonction_types";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
