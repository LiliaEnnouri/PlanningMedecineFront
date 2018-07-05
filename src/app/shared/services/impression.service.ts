/**
 * Created by Abbes on 31/08/2017.
 */
import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {Config} from "../config";
import {Conversation} from "../models/conversation";
import {UserService} from "./user.service";

@Injectable()
export class ImpressionService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService, private userService: UserService) {
    super();
  }

  attestationInscription(langueId: number, studentCode: string) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/impression/inscription";
    const options = {
      headers: headers,
      responseType: 'blob' as 'json'
    }
    return this.http.post<any>(url, {
      id_Langue: langueId,
      studentCode: studentCode
    }, options)
      .pipe(catchError(this.handleErrors));
  }

  attestationPresence(langueId: number, studentCode: string) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/impression/presence";
    const options = {
      headers: headers,
      responseType: 'blob' as 'json'
    };
    return this.http.post<any>(url, {
      id_Langue: langueId,
      studentCode: studentCode
    }, options)
      .pipe(catchError(this.handleErrors));
  }
}

