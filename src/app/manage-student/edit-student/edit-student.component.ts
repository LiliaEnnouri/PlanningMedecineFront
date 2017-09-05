import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Student} from "../../shared/models/student";
import {StudentService} from "../../shared/services/student.service";
import {UserService} from "../../shared/services/user.service";
import {Utils} from "../../shared/utils";

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  student: Student;
  busy: Subscription;
  isAdmin: boolean;

  constructor(private  route: ActivatedRoute,
              private userService: UserService,
              private studentService: StudentService) {

  }

  ngOnInit() {

    this.isAdmin = this.userService.checkIfAdminHasRole(1);
    this.route.params.subscribe(
      params => {
        const id_student = +params["studentId"];
        this.busy = this.studentService.getStudentById(id_student).subscribe(data => {
          data.isNew = Utils.verifyNewStudent(data.study_access_year);
          this.student = data;
        });
      });
  }

}
