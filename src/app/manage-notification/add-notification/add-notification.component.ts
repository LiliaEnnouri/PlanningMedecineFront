import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {NotificationService} from "../../shared/services/notification.service";
import {Notification} from "../../shared/models/notification";
import {Level} from "../../shared/models/level";
import {StudentFileService} from "../../shared/services/student-file.service";
import {Student} from "../../shared/models/student";
import {StudentService} from "../../shared/services/student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
declare let jQuery;
declare let swal;
@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {
  notification: Notification;
  busy: Subscription;
  submitted: boolean;
  levels: Array<Level>;
  students: Array<Student>;
  isEditMode: boolean;

  constructor(private notificationService: NotificationService, private router: Router, private route: ActivatedRoute,
              private studentFileService: StudentFileService, private studentService: StudentService, private userService: UserService) {
    this.notification = new Notification();
    this.isEditMode = router.url.indexOf('edit') > 0;
  }

  ngOnInit() {
    if (!this.userService.checkIfAdminHasRole(1)) {
      this.router.navigateByUrl('/error/not-authorized');
      return;
    }
    this.getAllLevels();
    this.initLevelsSelect();
    this.getAllStudents();
    this.initStudentsSelect();

    if (this.isEditMode) {
      const baseContext = this;
      this.route.params.subscribe(
        params => {
          const idNotification = +params["notificationId"];
          baseContext.busy = this.notificationService.getNotificationById(idNotification).subscribe(data => {
            baseContext.notification = data;
            const selectStudent = jQuery(".select-student");
            const selectLevel = jQuery(".select-level");
            setTimeout(function () {
              selectStudent.val(baseContext.notification.id_Student).trigger('change');
              selectLevel.val(baseContext.notification.id_Level).trigger('change');
            }, 200);
          });
        });
    }

  }

  private getAllLevels() {
    const baseContext = this;
    this.studentFileService.getAllLevels()
      .subscribe(
        (data) => {
          this.levels = data;
          if (this.isEditMode) {
            const selectLevel = jQuery(".select-level");
            setTimeout(function () {
              selectLevel.val(baseContext.notification.id_Level).trigger('change');
            }, 200);
          }
        }
      )
  }

  private initLevelsSelect() {
    const baseContext = this;
    const selectLevel = jQuery(".select-level");
    selectLevel.select2();
    selectLevel.on('change', function () {
      baseContext.notification.id_Level = +jQuery(this).val();
    });
  }

  private getAllStudents() {
    const baseContext = this;
    this.studentService.getAllStudents()
      .subscribe(
        (data) => {
          this.students = data;
          if (this.isEditMode) {
            const selectStudent = jQuery(".select-student");
            setTimeout(function () {
              selectStudent.val(baseContext.notification.id_Student).trigger('change');
            }, 200);
          }
        }
      )
  }

  private initStudentsSelect() {
    const baseContext = this;
    const selectStudent = jQuery(".select-student");
    selectStudent.select2();
    selectStudent.on('change', function () {
      baseContext.notification.id_Student = +jQuery(this).val();
    });
  }

  addNotification() {
    if (this.isEditMode) {
      this.busy = this.notificationService.editNotification(this.notification).subscribe(data => {
        swal({
          title: "Modifié!",
          text: "Cette notification est modifié.",
          confirmButtonColor: "#66BB6A",
          type: "success"
        });
        this.router.navigateByUrl('notification/list');
      })
    } else {
      this.busy = this.notificationService.addNotification(this.notification).subscribe(data => {
        swal({
          title: "Ajoutée!",
          text: "Cette notification est ajoutée.",
          confirmButtonColor: "#66BB6A",
          type: "success"
        });
        this.router.navigateByUrl('notification/list');
      })
    }

  }
}
