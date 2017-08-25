import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http} from "@angular/http";
import {Config} from "../config";
import {UserService} from "./user.service";
import {Notification} from "../models/notification";

@Injectable()
export class NotificationService extends GenericService {

  constructor(private http: Http, private storageService: StorageService, private userService: UserService) {
    super();
  }


  getAllNotifications() {
    const url = Config.baseUrl + '/notification';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getNotificationById(id_notification: number) {
    const url = Config.baseUrl + '/notification/' + id_notification;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  addNotification(notifiation: Notification) {
    const url = Config.baseUrl + '/notification/addd';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, notifiation, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  updateNotificationStatus(notification: Notification, status: number) {
    const url = Config.baseUrl + '/notification/' + notification.id_Notification + '/status/{status}';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {
      status: status
    }, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  deleteNotification(id_Notification: number) {
    const url = Config.baseUrl + '/notification/' + id_Notification;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
