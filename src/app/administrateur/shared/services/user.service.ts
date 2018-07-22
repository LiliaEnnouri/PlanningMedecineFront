import {StorageService} from "./storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {Administrateur} from "../models/Administrateur";
@Injectable()
export class UserService extends GenericService {
  loggedAdmin: Administrateur;

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }

}
