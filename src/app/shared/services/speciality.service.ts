import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {StorageService} from "./storage.service";

@Injectable()
export class SpecialityService extends GenericService {
  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }

  getAll() {
    const url = Config.baseUrl + "/speciality/all";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  affectTeacher(specialityId: number, teacherId: number) {
    const url = Config.baseUrl + "/speciality/" + specialityId + "/affectTeacher";

    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url, {
        teacherId: teacherId
      },
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }
}
