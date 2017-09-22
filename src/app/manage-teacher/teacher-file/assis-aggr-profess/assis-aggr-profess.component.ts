import {Component, Input, OnInit} from "@angular/core";
import {StorageService} from "../../../shared/services/storage.service";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../../shared/utils";
import {Result} from "../../../shared/models/result";
import {Specialite} from "../../../shared/models/specialite";
import {Router} from "@angular/router";
import {Teacher} from "../../../shared/models/Teacher";
import {TeacherFileService} from "../../../shared/services/teacher-file.service";
import {SharedService} from "../../../shared/services/shared.service";
import {TeacherConcour} from "../../../shared/models/Teacher_Concour";
declare let jQuery: any;
declare let swal: any;
@Component({
  selector: 'app-assis-aggr-component',
  templateUrl: 'assis-aggr-profess.component.html',
  styleUrls: [],

})
export class AssisAggrProfessComponent implements OnInit {

  @Input()
  teacher: Teacher;
  @Input()
  isAdmin: boolean;
  @Input()
  mode: string;
  busy: Subscription;
  submitted: boolean;
  years: number[] = [];
  results: Result[] = [];
  specialities: Specialite[] = [];
  isEditAction: boolean;
  indexSelected: number;
  typeGrade: number;
  title: string;

  ngOnInit() {
    const baseContext = this;
    this.years = Utils.getYears(1990);

    this.typeGrade = this.getTypeGrade(this.mode);


    this.isEditAction = this.verifyIfEdit(this.typeGrade, this.teacher.concours);

    if (!this.isEditAction) {
      const concour = new TeacherConcour();
      concour.id_Concour_Type = this.typeGrade;
      this.teacher.concours.push(concour);
      this.indexSelected = this.teacher.concours.length - 1;
    }

    baseContext.initSpecialitySelect();
    baseContext.initResultSelect();
    baseContext.initYearSelect();

    baseContext.getAllResults();
    baseContext.getAllSpecialities();


  }

  constructor(private stoarageService: StorageService,
              private teacherFileService: TeacherFileService,
              private router: Router,
              private sharedService: SharedService) {
  }

  private initYearSelect() {
    const year = jQuery(".select-year");
    const baseContext = this;
    year.select2();

    year.on("change", function () {
      baseContext.teacher.concours[baseContext.indexSelected].year = +jQuery(this).val();
    });

    if (this.isEditAction) {
      setTimeout(function () {
        year.val(baseContext.teacher.concours[baseContext.indexSelected].year).trigger("change");
      }, 10);
    }
  }

  private getAllResults() {
    this.busy = this.sharedService.getAllResults()
      .subscribe(
        (data) => {
          this.results = data;

          if (this.isEditAction) {
            const baseContext = this;
            const result = jQuery(".select-result");
            setTimeout(function () {
              result.val(baseContext.teacher.concours[baseContext.indexSelected].id_result).trigger("change");
            }, 10);
          }
        },
        (error) => {

        }
      )
  }

  private initResultSelect() {
    const result = jQuery(".select-result");
    const baseContext = this;
    result.select2();

    result.on("change", function () {
      baseContext.teacher.concours[baseContext.indexSelected].id_result = +jQuery(this).val();

      setTimeout(function () {
        baseContext.initSpecialitySelect();
      }, 20);

    })
  }

  private getAllSpecialities() {
    this.busy = this.sharedService.getAllSpecialities()
      .subscribe(
        (data) => {
          this.specialities = data;

          if (this.isEditAction) {
            const baseContext = this;
            const speciality = jQuery(".select-specialite");
            setTimeout(function () {
              speciality.val(baseContext.teacher.concours[baseContext.indexSelected].id_Specialite).trigger("change")
            }, 20);

          }
        },
        (error) => {

        }
      )
  }

  initSpecialitySelect() {
    const specialite = jQuery(".select-specialite");
    const baseContext = this;
    specialite.select2();

    specialite.on("change", function () {
      baseContext.teacher.concours[baseContext.indexSelected].id_Specialite = +jQuery(this).val()
    })
  }


  validationConcour() {
    this.submitted = true;
    const baseContext = this;
    console.log(baseContext.teacher.concours[baseContext.indexSelected]);

    if (!baseContext.teacher.concours[baseContext.indexSelected].year
      || !baseContext.teacher.concours[baseContext.indexSelected].id_result
      || !baseContext.teacher.concours[baseContext.indexSelected].id_Specialite) {
      return;
    }
    this.busy = this.teacherFileService.editConcours(baseContext.teacher.concours[baseContext.indexSelected], this.teacher.id_Teacher)
      .subscribe(
        (data) => {
          console.log(data);
          baseContext.teacher.concours[baseContext.indexSelected] = data;
          swal({
            title: "Succès!",
            text: 'Ajout Concours Assistanat avec succées',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
          this.router.navigate(["/teacher-file"]);
        },
        (error) => {

        }
      );
  }


  reinitialiseConcour() {
    const baseContext = this;
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel pls!",
        closeOnConfirm: true,
        closeOnCancel: true
      },
      function (isConfirm) {
        if (isConfirm) {

          baseContext.busy = baseContext.teacherFileService.removeConcour(baseContext.typeGrade, this.teacher.id_Teacher)
            .subscribe(
              (data) => {
                baseContext.teacher = data;
                swal({
                  title: "Succès!",
                  text: 'La réinitialisation est éffectué avec succées',
                  confirmButtonColor: "#66BB6A",
                  type: "success"
                });
                baseContext.router.navigate(["/teacher-file"]);
              },
              (error) => {

              }
            )

        } else {
          swal({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            confirmButtonColor: "#2196F3",
            type: "error"
          });
        }
      });
  }

  private getTypeGrade(url: string) {
    if (url.indexOf("assistanat") !== -1) {
      this.title = "Assistanat";
      return 2;
    }
    if (url.indexOf("aggregation") !== -1) {
      this.title = "Aggregation";
      return 3;
    }
    if (url.indexOf("professorat") !== -1) {
      this.title = "Professorat";
      return 4;
    }

  }

  private verifyIfEdit(concourType: number, concours: TeacherConcour[]) {
    if (concours == null || concours.length === 0) {
      return false;
    }
    for (let i = 0; i < concours.length; i++) {
      if (concours[i].id_Concour_Type === concourType) {
        this.indexSelected = i;
        return true;
      }
    }
    return false;
  }
}


