import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class PlageUniteService {
  headers: HttpHeaders;

  constructor() {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }


}
