import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {NotificationService} from "../../shared/services/notification.service";
import {Notification} from "../../shared/models/notification";
import {Level} from "../../shared/models/level";
import {StudentFileService} from "../../shared/services/student-file.service";
import {Student} from "../../shared/models/student";
import {StudentService} from "../../shared/services/student.service";
import {Router} from "@angular/router";
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

  constructor(private notificationService: NotificationService, private router: Router,
              private studentFileService: StudentFileService, private studentService: StudentService,) {
    this.notification = new Notification();
  }

  ngOnInit() {
    this.getAllLevels();
    this.initLevelsSelect();
    this.getAllStudents();
    this.initStudentsSelect();
  }

  private getAllLevels() {
    const baseContext = this;
    this.studentFileService.getAllLevels()
      .subscribe(
        (data) => {
          this.levels = data;
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
        }
      )
  }

  private initStudentsSelect() {
    const baseContext = this;
    const selectLevel = jQuery(".select-student");
    selectLevel.select2();
    selectLevel.on('change', function () {
      baseContext.notification.id_Student = +jQuery(this).val();
    });
  }

  addNotification() {
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
