import {Component, Input, OnInit} from "@angular/core";
import {UserService} from "../../../shared/services/user.service";
import {StorageService} from "../../../shared/services/storage.service";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../../shared/utils";
import {Result} from "../../../shared/models/result";
import {Specialite} from "../../../shared/models/specialite";
import {Semester} from "../../../shared/models/semester";
import {Hopital} from "../../../shared/models/hopital";
import {Service} from "../../../shared/models/service";
import {University} from "../../../shared/models/university";
import {Router} from "@angular/router";
import {NationalExam} from "../../../shared/models/nationalExam";
import {Teacher} from "../../../shared/models/Teacher";
import {TeacherFileService} from "../../../shared/services/teacher-file.service";
import {SharedService} from "../../../shared/services/shared.service";
import {TeacherConcour} from "../../../shared/models/Teacher_Concour";
import {SpecialityService} from "../../../shared/services/speciality.service";

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-residanat-component',
  templateUrl: 'residanat-teacher-file.component.html',
  styleUrls: [],
})
export class ResidanatTeacherFileComponent implements OnInit {

  @Input()
  teacher: Teacher;
  @Input()
  isAdmin: boolean;
  busy: Subscription;
  submitted: boolean;
  years: number[] = [];
  results: Result[] = [];
  specialities: Specialite[] = [];
  hopitaux: Hopital[] = [];
  services: Service[] = [];
  universities: University[] = [];
  isEditAction: boolean;
  isNationalExam: boolean;
  indexSelected: number;

  ngOnInit() {
    const baseContext = this;
    this.years = Utils.getYears(1990);


    this.isEditAction = this.verifyIfEdit(1, this.teacher.concours);
    if (!this.isEditAction) {
      const concour = new TeacherConcour();
      concour.id_Concour_Type = 1;
      this.teacher.concours.push(concour);
      this.indexSelected = this.teacher.concours.length - 1;
    }
    if (this.isEditAction) {
      this.isNationalExam = this.teacher.concours[this.indexSelected].national_exam !== null;
      if (this.isNationalExam) {
        setTimeout(function () {
          baseContext.initResultExam();
          baseContext.initDateExam();
        }, 20);
      }
      if (this.teacher.concours[this.indexSelected].id_result === 2) {
        setTimeout(function () {
          baseContext.initSpecialitySelect();
        }, 20);
      }

      for (let i = 0; i < this.teacher.concours[this.indexSelected].semesters.length; i++) {
        this.initSelectsSemester(i, 50);
      }
    }


    this.getAllResults();
    this.getAllSpecialities();
    this.getAllHopitaux();
    this.getAllServices();
    this.getAllUniversities();

    this.initYearSelect();
    this.initResultSelect();
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

  constructor(private stoarageService: StorageService,
              private teacherFileService: TeacherFileService,
              private router: Router,
              private userService: UserService,
              private sharedService: SharedService,
              private specialityService: SpecialityService) {
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
          if (this.isNationalExam) {
            const baseContext = this;
            const result = jQuery(".select-result-exam");
            setTimeout(function () {
              result.val(baseContext.teacher.concours[baseContext.indexSelected].national_exam.id_result).trigger("change");
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

      if (baseContext.teacher.concours[baseContext.indexSelected].id_result === 2) {
        setTimeout(function () {
          baseContext.initSpecialitySelect();
        }, 20);
      } else {
        baseContext.teacher.concours[baseContext.indexSelected].national_exam = null;
        baseContext.teacher.concours[baseContext.indexSelected].semesters = [];
        baseContext.isNationalExam = false;
      }
    })
  }

  private getAllSpecialities() {
    this.busy = this.specialityService.getAll()
      .subscribe(
        (data) => {
          this.specialities = data;

          if (this.isEditAction && this.teacher.concours[this.indexSelected].id_result === 2) {
            const baseContext = this;
            const speciality = jQuery(".select-specialite");
            setTimeout(function () {
              speciality.val(baseContext.teacher.concours[baseContext.indexSelected].id_Specialite).trigger("change");
            }, 20);

          }

          this.settingInSelect("specialite");
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
      baseContext.teacher.concours[baseContext.indexSelected].id_Specialite = +jQuery(this).val();
    })
  }

  addSemester() {

    this.submitted = true;
    console.log(this.isChampFulled());
    if (!this.isChampFulled()) {
      return;
    }
    this.submitted = false;
    this.teacher.concours[this.indexSelected].semesters.push(new Semester());

    this.initSelectsSemester(this.teacher.concours[this.indexSelected].semesters.length - 1, 50);
  }

  removeSemester() {
    this.teacher.concours[this.indexSelected].semesters.pop();
  }

  private initDates(index: number) {
    jQuery('.date').daterangepicker({
      "singleDatePicker": true,
      "showDropdowns": true,
      "locale": {
        "format": "DD/MM/YYYY"
      }
    });

    const baseContext = this;
    const startDate = jQuery('.startDate' + '_' + index);
    const endDate = jQuery('.endDate' + '_' + index);

    startDate.val('');
    endDate.val('');


    startDate.on("change", function () {
      baseContext.teacher.concours[baseContext.indexSelected].semesters[index].start_date = Utils.convertDateServer(jQuery(this).val());
    });
    endDate.on("change", function () {
      baseContext.teacher.concours[baseContext.indexSelected].semesters[index].end_date = Utils.convertDateServer(jQuery(this).val());
    });

    if (this.isEditAction) {
      startDate.val(Utils.convertDate(baseContext.teacher.concours[baseContext.indexSelected].semesters[index].start_date))
        .trigger("change");
      endDate.val(Utils.convertDate(baseContext.teacher.concours[baseContext.indexSelected].semesters[index].end_date))
        .trigger("change");
    }
  }

  private initSelectsSemester(index: number, timout: number) {
    const baseContext = this;
    setTimeout(function () {
      baseContext.initDates(index);
      // baseContext.initSpecialitySelectSemester(index);
      baseContext.initServiceSelect(index);
      baseContext.initHopitalSelect(index);
      baseContext.initUniversitySelect(index);
    }, timout);
  }

  private getAllHopitaux() {
    this.busy = this.sharedService.getAllHopitaux()
      .subscribe(
        (data) => {
          this.hopitaux = data;

          this.settingInSelect("hopital");
        },
        (error) => {

        }
      )
  }

  private getAllServices() {
    this.sharedService.getAllServices()
      .subscribe(
        (data) => {
          this.services = data;

          this.settingInSelect("service");
        },
        (error) => {

        }
      )
  }

  private getAllUniversities() {
    this.sharedService.getAllUniversities()
      .subscribe(
        (data) => {
          this.universities = data;

          this.settingInSelect("university");
        },
        (error) => {

        }
      )
  }

  initUniversitySelect(index: number) {
    const university = jQuery(".select-university" + "_" + index);
    const baseContext = this;
    university.select2();

    university.on("change", function () {
      baseContext.teacher.concours[baseContext.indexSelected].semesters[index].id_university = +jQuery(this).val();
    })
  }

  initHopitalSelect(index: number) {
    const hopital = jQuery(".select-hopital" + "_" + index);
    const baseContext = this;
    hopital.select2();

    hopital.on("change", function () {
      baseContext.teacher.concours[baseContext.indexSelected].semesters[index].id_Hopital = +jQuery(this).val();
    })
  }


  initServiceSelect(index: number) {
    const service = jQuery(".select-service" + "_" + index);
    const baseContext = this;
    service.select2();

    service.on("change", function () {
      baseContext.teacher.concours[baseContext.indexSelected].semesters[index].id_Service = +jQuery(this).val();
    })
  }

  private isChampFulled() {

    if (!this.teacher.concours[this.indexSelected].year || !this.teacher.concours[this.indexSelected].id_result) {
      return false;
    }
    const semesters = this.teacher.concours[this.indexSelected].semesters;
    for (let i = 0; i < semesters.length; i++) {
      if (!semesters[i].start_date ||
        !semesters[i].end_date ||
        !semesters[i].id_Service ||
        !semesters[i].id_university ||
        !semesters[i].id_Hopital /*||
       !semesters[i].id_Specialite*/) {
        return false;
      }
    }
    return true;
  }

  validationResidanat() {
    this.submitted = true;
    console.log(this.teacher.concours[this.indexSelected]);

    if (!this.isChampFulled()) {
      return;
    }
    this.busy = this.teacherFileService.editConcours(this.teacher.concours[this.indexSelected], this.teacher.id_Teacher)
      .subscribe(
        (data) => {
          console.log(data);
          this.teacher.concours[this.indexSelected] = data;
          swal({
            title: "Succès!",
            text: 'Ajout Concours Residanat avec succées',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
        },
        (error) => {

        }
      );

  }

  private settingInSelect(name: string) {
    const baseContext = this;

    if (baseContext.isEditAction) {
      setTimeout(function () {
        for (let i = 0; i < baseContext.teacher.concours[baseContext.indexSelected].semesters.length; i++) {
          const select = jQuery(".select-" + name + "_" + i);
          const value = baseContext.getValue(name, i);
          select.val(value).trigger("change");
        }
      }, 20);

    }
  }

  getValue(name: string, index: number) {
    const baseContext = this;
    switch (name) {
      case  "hopital" : {
        return baseContext.teacher.concours[baseContext.indexSelected].semesters[index].id_Hopital;
      }

      case "university" : {
        return baseContext.teacher.concours[baseContext.indexSelected].semesters[index].id_university;
      }
      case "service" : {
        return baseContext.teacher.concours[baseContext.indexSelected].semesters[index].id_Service;
      }
    }
  }

  addNationalExam() {
    const baseContext = this;

    this.isNationalExam = !this.isNationalExam;

    if (this.isNationalExam) {
      baseContext.teacher.concours[baseContext.indexSelected].national_exam = new NationalExam();
      setTimeout(function () {
        baseContext.initResultExam();
        baseContext.initDateExam();
      }, 20);
    }
  }

  private initResultExam() {
    const resultExam = jQuery(".select-result-exam");
    const baseContext = this;

    resultExam.select2();

    resultExam.on("change", function () {
      baseContext.teacher.concours[baseContext.indexSelected].national_exam.id_result = +jQuery(this).val();
    });
  }

  private initDateExam() {
    const dateExam = jQuery(".date-exam");
    const baseContext = this;

    dateExam.daterangepicker({
      "singleDatePicker": true,
      "showDropdowns": true,
      "locale": {
        "format": "DD/MM/YYYY"
      }
    });
    dateExam.val('');

    dateExam.on("change", function () {
      baseContext.teacher.concours[baseContext.indexSelected].national_exam.date = Utils.convertDateServer(jQuery(this).val());
    });

    if (this.isEditAction) {
      dateExam.val(Utils.convertDate(baseContext.teacher.concours[baseContext.indexSelected].national_exam.date)).trigger("change");
    }
  }

  reinitialiseResidanat() {
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
          baseContext.busy = baseContext.teacherFileService.removeConcour(1, baseContext.teacher.id_Teacher)
            .subscribe(
              (data) => {
                swal({
                  title: "Succès!",
                  text: 'La réinitialisation est éffectué avec succées',
                  confirmButtonColor: "#66BB6A",
                  type: "success"
                });
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
}


