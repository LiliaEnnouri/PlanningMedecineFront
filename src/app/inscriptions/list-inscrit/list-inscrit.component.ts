/**
 * Created by Abbes on 25/08/2017.
 */
import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../shared/services/admin.service";
import {Subscription} from "rxjs/Subscription";
import {RegistrationYearUniversityStudent} from "../../shared/models/RegistrationYearUniversityStudent";
import {Utils} from "../../shared/utils";
import {StudentFileService} from "../../shared/services/student-file.service";
import {Level} from "../../shared/models/level";

import * as FileSaver from "file-saver";
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
  selectedLevel: number;
  levels: Array<Level>;

  constructor(private studentFileServie: StudentFileService,
              private adminService: AdminService) {
    this.selectedLevel = 0;
  }

  ngOnInit() {
    const baseContext = this;
    this.busy = this.adminService.getListInscritStudents()
      .subscribe(
        (data) => {
          this.registrationsUniversityStudents = data;
          Utils.initializeDataTables(300, 7);
        }
      );
    this.getAllLevels();
    this.initLevelSelect();
  }

  private initLevelSelect() {
    const selectLevel = jQuery(".select-level");
    selectLevel.select2();
    const baseContext = this;
    selectLevel.on("change", function () {
      baseContext.selectLevel(+jQuery(this).val());
    });
  }

  private getAllLevels() {
    this.studentFileServie.getAllLevels()
      .subscribe(
        (data) => {
          this.levels = data;
        }
      )
  }


  selectLevel(levelId: number) {
    this.selectedLevel = levelId;
    const baseContext = this;
    if (levelId === 0) {
      this.busy = this.adminService.getListInscritStudents()
        .subscribe(
          (data) => {
            this.registrationsUniversityStudents = data;
            Utils.reInitializeDataTables(300, 7);
          }
        )
    } else {
      this.busy = this.adminService.getListInscritStudentsByLevel(levelId)
        .subscribe(
          (data) => {
            this.registrationsUniversityStudents = data;
            Utils.reInitializeDataTables(300, 7);
          }
        )
    }
  }

  generationAttestationFr(index: number) {
    this.busy=this.studentFileServie.generationAttestationFr(this.registrationsUniversityStudents[index].id_student, this.registrationsUniversityStudents[index].registration_university.year_university, this.registrationsUniversityStudents[index].id_level)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, this.registrationsUniversityStudents[index].student.first_name
            + " " + this.registrationsUniversityStudents[index].student.last_name
            + "_Attestation_" + this.registrationsUniversityStudents[index].registration_university.year_university
            + ".pdf");
        },
        (error) => {

        }
      )
  }


}
