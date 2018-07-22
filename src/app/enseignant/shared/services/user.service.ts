import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {map, catchError} from 'rxjs/operators';
import {ResponseContentType} from '@angular/http';
import {Administrateur} from "../models/Administrateur";
import {Config} from "../config";

@Injectable()
export class UserService extends GenericService {
  loggedAdmin: Administrateur;

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
    this.loggedAdmin = <Administrateur> storageService.read('administrateur');
  }

  getLoggedAdmin() {
    const headers = this.headers.set("Authorization", "Bearer " + this.getTokent());
    const url = Config.baseUrl + "/admin/me";

    return this.http.get<any>(url, {
      headers: headers
    }).pipe(catchError(this.handleErrors));
  }

  getTokent() {
    return <string>this.storageService.read("admin-token")
  }

  checkIfAdminHasRole(roleId: number) {
    let hasRole = false;
    /* if (!this.loggedAdmin) {
      return false;
    }
    if (!this.loggedAdmin.privileges) {
      return false;
    }
    this.loggedAdmin.privileges.forEach(function (privilege) {
      if (privilege.id_Privilege === 1) {
        hasRole = true;
      }
      if (privilege.id_Privilege === roleId) {
        hasRole = true;
      }
    });
    */
    return hasRole;
  }

  checkIfOnlyAdminHasRole(roleId: number) {
    /*
        if (!this.loggedAdmin) {
          return false;
        }
        if (!this.loggedAdmin.privileges) {
          return false;
        }
        if (this.loggedAdmin.privileges.length > 1) {
          return false;
        }
        return this.loggedAdmin.privileges[0].id_Privilege === roleId;
        */
    return null;
  }
}
