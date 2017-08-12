import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Student} from "../../shared/models/student";
import {StudentService} from "../../shared/services/student.service";

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  student: Student;
  busy: Subscription;

  constructor(private  route: ActivatedRoute, private studentService: StudentService) {
    this.student = new Student();
  }

  ngOnInit() {
    const baseContext = this;
    this.route.params.subscribe(
      params => {
        this.student.id_student = +params["studentId"];
        this.studentService.getStudentById(this.student.id_student).subscribe(data => {
          this.student = data;
        });
      });
  }

}
