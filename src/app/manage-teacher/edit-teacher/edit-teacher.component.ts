import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Student} from "../../shared/models/student";
import {UserService} from "../../shared/services/user.service";
import {Utils} from "../../shared/utils";
import {TeacherService} from "../../shared/services/teacher.service";
import {Teacher} from "../../shared/models/Teacher";

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  teacher: Teacher;
  busy: Subscription;
  isAdmin: boolean;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private teacherService: TeacherService) {

  }

  ngOnInit() {

    this.isAdmin = this.userService.checkIfAdminHasRole(1);
    this.route.params.subscribe(
      params => {
        const id_teacher = +params["teacherId"];
        this.busy = this.teacherService.getTeacherById(id_teacher).subscribe(data => {
          data.isNew = Utils.verifyNewStudent(data.study_access_year);
          this.teacher = data;
        });
      });
  }

}
