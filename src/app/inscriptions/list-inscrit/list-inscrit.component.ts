/**
 * Created by Abbes on 25/08/2017.
 */
import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../shared/services/admin.service";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../shared/utils";
import {StudentFileService} from "../../shared/services/student-file.service";
import {Level} from "../../shared/models/level";

import * as FileSaver from "file-saver";
import {Student} from "../../shared/models/student";

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-student',
  templateUrl: './list-inscrit.component.html',
  styleUrls: []
})
export class ListInscritComponent implements OnInit {

  busy: Subscription;
  registrationsUniversityStudents: Student[] = [];
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
          Utils.initializeDataTables(50, 7);
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
    this.busy = this.studentFileServie.generationAttestationFr(this.registrationsUniversityStudents[index].id_student,
      this.registrationsUniversityStudents[index].registrations[0].registration_university.year_university,
      this.registrationsUniversityStudents[index].registrations[0].id_level)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, this.registrationsUniversityStudents[index].first_name
            + " " + this.registrationsUniversityStudents[index].last_name
            + "_Attestation_" + this.registrationsUniversityStudents[index].registrations[0].registration_university.year_university
            + ".pdf");
        },
        (error) => {

        }
      )
  }

  generationAttestationAr(index: number) {
    this.busy = this.studentFileServie.generationAttestationAr(this.registrationsUniversityStudents[index].id_student,
      this.registrationsUniversityStudents[index].registrations[0].registration_university.year_university,
      this.registrationsUniversityStudents[index].registrations[0].id_level)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, this.registrationsUniversityStudents[index].first_name
            + " " + this.registrationsUniversityStudents[index].last_name
            + "_Attestation_Ar_" + this.registrationsUniversityStudents[index].registrations[0].registration_university.year_university
            + ".pdf");
        },
        (error) => {
          swal({
            title: "Erreur!",
            text: "Etudiant n'a pas eu de nom arabe",
            type: "error"
          });
        }
      )
  }

  generationPresenceFr(index: number) {
    this.busy = this.studentFileServie.generationAttestationPresenceFr(this.registrationsUniversityStudents[index].id_student,
      this.registrationsUniversityStudents[index].registrations[0].registration_university.year_university,
      this.registrationsUniversityStudents[index].registrations[0].id_level)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, this.registrationsUniversityStudents[index].first_name
            + " " + this.registrationsUniversityStudents[index].last_name
            + "_Presence_" + this.registrationsUniversityStudents[index].registrations[0].registration_university.year_university
            + ".pdf");
        },
        (error) => {

        })
  }

  generationPresenceAr(index: number) {
    this.busy = this.studentFileServie.generationAttestationPresenceAr(this.registrationsUniversityStudents[index].id_student,
      this.registrationsUniversityStudents[index].registrations[0].registration_university.year_university,
      this.registrationsUniversityStudents[index].registrations[0].id_level)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, this.registrationsUniversityStudents[index].first_name
            + " " + this.registrationsUniversityStudents[index].last_name
            + "_Presence_" + this.registrationsUniversityStudents[index].registrations[0].registration_university.year_university
            + ".pdf");
        },
        (error) => {

        })
  }

  generateStudentFileByLevel() {
    const baseContext = this;
    if (this.selectedLevel) {
      this.adminService.generateStudentFile(this.selectedLevel)
        .subscribe(
          (data) => {
            FileSaver.saveAs(data, "Liste_Dossiers_" + baseContext.selectedLevel + ".pdf");
          }
        )
    } else {
      swal({
        title: "Attention !",
        text: "Séléctionner le niveau SVP !",
        type: 'warning',
      })
    }
  }

  retirerInscriptionStudent(registration_id_student: number, index: number) {
    let baseContext = this;
    swal({
        title: "Retirer L'inscription?",
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#33cc33',
        confirmButtonText: 'مغادرة',
        cancelButtonText: 'سحب',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-warning',
        buttonsStyling: false
      },
      function (log) {
        console.log(log);
        //مغادرة : 1
        baseContext.busy = baseContext.studentFileServie.updateRegistrationStudent(registration_id_student, log ? 1 : 2)
          .subscribe(
            (data) => {
              swal({
                title: "Success!",
                text: "Opération effectué avec succées",
                type: "success"
              });
              baseContext.registrationsUniversityStudents.splice(index, 1);
            },
            (error) => {
              swal({
                title: "Erreur!",
                text: "Erreur",
                type: "erreur"
              });
            }
          );
      }
    )
  }

  downloadStudentsExcel() {
    this.busy = this.adminService.getListInscritbyLevelExcel(this.selectedLevel)
      .subscribe(
        (data) => {
          if (this.selectedLevel > 0) {
            FileSaver.saveAs(data, 'Liste Etudiants en ' + this.levels[this.selectedLevel - 1].label + '.xls');
          } else {
            FileSaver.saveAs(data, 'Liste Etudiants .xls');
          }
        },
        (error) => {

        }
      );

  }


}
