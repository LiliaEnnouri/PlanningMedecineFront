/**
 * Created by Abbes on 25/08/2017.
 */
import {Component, OnInit} from "@angular/core";
import {StudentService} from "../../shared/services/student.service";
import {AdminService} from "../../shared/services/admin.service";
import {Subscription} from "rxjs/Subscription";
import {RegistrationYearUniversityStudent} from "../../shared/models/RegistrationYearUniversityStudent";
import {Utils} from "../../shared/utils";


declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-student',
  templateUrl: './list-inscrit.component.html',
  styleUrls: []
})
export class ListInscritComponent implements OnInit {

  busy: Subscription;

  registrationsUniversityStudents: RegistrationYearUniversityStudent[] = [];

  constructor(private studentService: StudentService,
              private adminService: AdminService) {
  }

  ngOnInit() {
    const baseContext = this;
    this.busy = this.adminService.getListInscritStudents()
      .subscribe(
        (data) => {
          this.registrationsUniversityStudents = data;
          Utils.initializeDataTables(300, 7);
        },
        (error) => {

        }
      )


  }


}