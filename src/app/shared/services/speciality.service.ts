import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {StorageService} from "./storage.service";

@Injectable()
export class SpecialityService extends GenericService {
  constructor(private http: Http, private storageService: StorageService) {
    super();
  }

  getAll() {
    const url = Config.baseUrl + "/speciality/all";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  affectTeacher(specialityId: number, teacherId: number) {
    const url = Config.baseUrl + "/speciality/" + specialityId + "/affectTeacher";

    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {
        teacherId: teacherId
      },
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
