/**
 * Created by Abbes on 31/08/2017.
 */
import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http, ResponseContentType} from "@angular/http";
import {Config} from "../config";
import {Conversation} from "../models/conversation";
import {UserService} from "./user.service";

@Injectable()
export class ImpressionService extends GenericService {

  constructor(private http: Http, private storageService: StorageService, private userService: UserService) {
    super();
  }

  attestationInscription(langueId: number, studentCode: string) {
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/impression/inscription";

    return this.http.post(url, {
      id_Langue: langueId,
      studentCode: studentCode
    }, {
      headers: this.headers,
      responseType: ResponseContentType.Blob
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}

