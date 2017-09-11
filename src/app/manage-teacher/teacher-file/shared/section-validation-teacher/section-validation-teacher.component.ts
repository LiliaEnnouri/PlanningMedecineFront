/**
 * Created by Abbes on 21/08/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {AdminService} from "../../../../shared/services/admin.service";
import {Utils} from "../../../../shared/utils";
import {Subscription} from "rxjs/Subscription";
import {Teacher} from "../../../../shared/models/Teacher";
import {SectionValidationTeacher} from "../../../../shared/models/section-validation-teacher";
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'section-validation-teacher',
  templateUrl: './section-validation-teacher.component.html',
  styleUrls: [],
})
export class SectionValidationTeacherComponent implements OnInit {


  @Input()
  sectionId: number;
  @Input()
  teacher: Teacher;
  busy: Subscription;
  statusSection: SectionValidationTeacher;


  constructor(private adminService: AdminService) {

  }

  ngOnInit() {
    this.statusSection = Utils.getStatusSection(this.teacher.validations, this.sectionId);
  }

  /* Admin Special */
  changeSectionStatus(status, note?: string) {
    this.statusSection.status = status;
    if (status === 2 && !note) {
      return;
    }

    this.busy = this.adminService.changeSectionStatus(this.statusSection.id_Teacher, this.statusSection.id_Section, status, note)
      .subscribe(
        (data) => {
          console.log(data);

          swal({
            title: "Succés!",
            text: 'La status à été changer avec succées',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
        },
        (error) => {
          console.log(error);
          swal({
            title: "Erreur!",
            text: 'Une erreur est survenu .... ',
            type: "error"
          });
        }
      )
  }
}


