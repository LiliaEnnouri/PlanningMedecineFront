import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Student} from "../../shared/models/student";
import {Subscription} from "rxjs/Subscription";
import {StudentService} from "../../shared/services/student.service";
import {Config} from "../../shared/config";
import {AdminService} from "../../shared/services/admin.service";
import * as FileSaver from "file-saver";
import {Utils} from "../../shared/utils";
@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {

  student: Student = new Student();
  busy: Subscription;
  baseUrl: string;

  constructor(private  route: ActivatedRoute, private studentService: StudentService, private adminService: AdminService) {
    this.student = new Student();
  }

  ngOnInit() {
    const baseContext = this;
    baseContext.baseUrl = Config.baseUrl;
    this.route.params.subscribe(
      params => {
        this.student.id_student = +params["studentId"];
        this.studentService.getStudentDetail(this.student.id_student).subscribe(data => {
          this.student = data;
          this.student.isNew = Utils.verifyNewStudent(this.student.study_access_year);
        });
      });
  }

  generatePDF(studentId: number) {
    this.adminService.generatePDFStudent(studentId)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, this.student.first_name + " " + this.student.last_name + "_Dossier.pdf");
        }
      )
  }

}
