import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {Config} from "../config";
import {UserService} from "./user.service";
import {Notification} from "../models/notification";

@Injectable()
export class NotificationService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService, private userService: UserService) {
    super();
  }


  getAllNotifications() {
    const url = Config.baseUrl + '/notification';
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getNotificationById(id_notification: number) {
    const url = Config.baseUrl + '/notification/' + id_notification;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  addNotification(notifiation: Notification) {
    const url = Config.baseUrl + '/notification/add';
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url, notifiation, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  updateNotificationStatus(notification: Notification, status: number) {
    const url = Config.baseUrl + '/notification/' + notification.id_Notification + '/status/{status}';
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url, {
      status: status
    }, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  deleteNotification(id_Notification: number) {
    const url = Config.baseUrl + '/notification/' + id_Notification;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  editNotification(notification: Notification) {
    const url = Config.baseUrl + '/notification/' + notification.id_Notification;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, notification
      , {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }
}
