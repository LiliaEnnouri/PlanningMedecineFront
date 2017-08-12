import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http} from "@angular/http";
import {StorageService} from "./storage.service";
import {Config} from '../config';
import {Reclamation} from "../models/reclamation";
/**
 * Created by AHMED on 04/08/2017.
 */
@Injectable()
export class ReclamationService extends GenericService {

  constructor(private http: Http, private stoarageService: StorageService) {
    super();
  }

  getAllReclamations() {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/reclamation";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  addReclamation(reclamation: Reclamation) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/reclamation/add";

    return this.http.post(url, JSON.stringify(reclamation), {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  updateStatus(reclamationId:number , status: number){

    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/reclamation/status/" + reclamationId  ;

    return this.http.put(url, {"status" : status,"template" : "emailReponseReclamationAuto"},
      {
        headers: this.headers
      }
    )
      .catch(this.handleErrors);
  }
  sendRepMail(reclamationId:number , content: string) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/reclamation/mail/" + reclamationId  ;

    return this.http.post(url, {"content" : content},
      {
        headers: this.headers
      }
    )
      .catch(this.handleErrors);


  }
}
