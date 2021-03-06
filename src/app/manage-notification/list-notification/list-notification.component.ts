import {Component, OnInit} from "@angular/core";
import {NotificationService} from "../../shared/services/notification.service";
import {Notification} from "../../shared/models/notification";
import {UserService} from "../../shared/services/user.service";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../shared/utils";
import {Router} from "@angular/router";
declare let swal;
declare let jQuery;
@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css']
})
export class ListNotificationComponent implements OnInit {

  notifications: Array<Notification>;
  busy: Subscription;

  constructor(private notificationService: NotificationService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    if (!this.userService.checkIfAdminHasRole(1)) {
      this.router.navigateByUrl('/error/not-authorized');
      return;
    }
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.busy = this.notificationService.getAllNotifications().subscribe(data => {
      this.notifications = data;
      Utils.initializeDataTables(500, 7);
    });
  }

  deleteNotification(index: number) {
    const baseContext = this;
    const notification: Notification = this.notifications[index];
    swal({
        title: "Vous êtes sûr?",
        text: "Cette notification va être supprimer définitivement!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "Oui, supprimer!",
        cancelButtonText: "Non, annuler!",
        closeOnConfirm: true,
        closeOnCancel: true
      },
      function (isConfirm) {
        if (isConfirm) {
          baseContext.busy = baseContext.notificationService.deleteNotification(notification.id_Notification).subscribe(data => {
            baseContext.notifications.splice(index, 1);
            swal({
              title: "Supprimé!",
              text: "Cette notification est supprimé.",
              confirmButtonColor: "#66BB6A",
              type: "success"
            });
          }, error => {

          });
        } else {
          swal({
            title: "Annulé",
            text: "Vous avez annulé cette action",
            confirmButtonColor: "#2196F3",
            type: "error"
          });
        }
      });
  }


  updateNotificationStatus(index: number, status: number) {
    const notification: Notification = this.notifications[index];
    this.busy = this.notificationService.updateNotificationStatus(notification, status).subscribe(data => {
      notification.status = status;
      swal({
        title: "Modifié!",
        text: "Cette notification est mise à jour.",
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
  }

}
