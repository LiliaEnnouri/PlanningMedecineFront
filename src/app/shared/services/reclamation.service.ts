import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {StorageService} from "./storage.service";
import {Config} from '../config';
import {Reclamation} from "../models/reclamation";
/**
 * Created by AHMED on 04/08/2017.
 */
@Injectable()
export class ReclamationService extends GenericService {

  constructor(private http: HttpClient, private stoarageService: StorageService) {
    super();
  }

  getAllReclamations() {
    const headers = this.headers.set("Authorization", "Bearer " + this.stoarageService.read("admin-token"));
    const url = Config.baseUrl + "/reclamation";

    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }



  updateStatus(reclamationId:number , status: number){

    const headers = this.headers.set("Authorization", "Bearer " + this.stoarageService.read("admin-token"));
    const url = Config.baseUrl + "/reclamation/status/" + reclamationId  ;

    return this.http.put<any>(url, {"status" : status,"template" : "emailReponseReclamationAuto"},
      {
        headers: headers
      }
    ).pipe(catchError(this.handleErrors));
  }
  sendRepMail(reclamationId:number , content: string) {
    const headers = this.headers.set("Authorization", "Bearer " + this.stoarageService.read("admin-token"));
    const url = Config.baseUrl + "/reclamation/mail/" + reclamationId  ;

    return this.http.post<any>(url, {"content" : content},
      {
        headers: headers
      }
    ).pipe(catchError(this.handleErrors));


  }
  sendMail(adminId:number , content: string ,topic: string) {
    const headers = this.headers.set("Authorization", "Bearer " + this.stoarageService.read("admin-token"));
    const url = Config.baseUrl + "/reclamation/mail/" + adminId  ;

    return this.http.post<any>(url, {"content" : content,"topic" : topic},
      {
        headers: headers
      }
    ).pipe(catchError(this.handleErrors));
  }

  getNumberOfReclamations() {
    const headers = this.headers.set("Authorization", "Bearer " + this.stoarageService.read("admin-token"));
    const url = Config.baseUrl + "/reclamation/number";

    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }


}
