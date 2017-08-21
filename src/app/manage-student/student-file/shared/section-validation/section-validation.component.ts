/**
 * Created by Abbes on 21/08/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SectionValidation} from "../../../../shared/models/section-validation";
import {AdminService} from "../../../../shared/services/admin.service";
import {Utils} from "../../../../shared/utils";
import {UserService} from "../../../../shared/services/user.service";
import {Student} from "../../../../shared/models/student";
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'section-validation',
  templateUrl: './section-validation.component.html',
  styleUrls: [],
})
export class SectionValidationComponent implements OnInit {


  @Input()
  sectionId: number;
  @Input()
  student: Student;


  statusSection: SectionValidation;


  constructor(private adminService: AdminService) {

  }

  ngOnInit() {
    this.statusSection = Utils.getStatusSection(this.student.validations, this.sectionId);
  }

  /* Admin Special */
  changeSectionStatus(status, note?: string) {
    this.statusSection.status = status;
    if (status === 2 && !note) {
      return;
    }
    this.adminService.changeSectionStatus(this.statusSection.id_student, this.statusSection.id_section, status, note)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      )
  }
}


