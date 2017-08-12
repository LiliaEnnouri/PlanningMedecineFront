import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Student} from "../../shared/models/student";
import {Subscription} from "rxjs/Subscription";
import {StudentService} from "../../shared/services/student.service";

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {

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
