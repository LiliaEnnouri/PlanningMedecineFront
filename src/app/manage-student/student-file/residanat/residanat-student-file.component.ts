import {Component, OnInit} from "@angular/core";
import {Student} from "../../../shared/models/student";
import {UserService} from "../../../shared/services/user.service";
import {StorageService} from "../../../shared/services/storage.service";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../../shared/utils";
import {StudentFileService} from "../../../shared/services/student-file.service";
import {Result} from "../../../shared/models/result";
import {Specialite} from "../../../shared/models/specialite";
import {Semester} from "../../../shared/models/semester";
import {Hopital} from "../../../shared/models/hopital";
import {Service} from "../../../shared/models/service";
import {University} from "../../../shared/models/university";
import {Residanat} from "../../../shared/models/residanat";
import {Router} from "@angular/router";
import {NationalExam} from "../../../shared/models/nationalExam";
declare var jQuery: any;
declare var swal: any;
@Component({
  templateUrl: 'residanat-student-file.component.html',
  styleUrls: [],
})
export class ResidanatStudentFileComponent implements OnInit {


  student: Student;
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

  ngOnInit() {
    const baseContext = this;
    this.student = <Student> this.stoarageService.read("student");
    this.years = Utils.getYears(1990);


    this.isEditAction = this.student.residanat !== null;
    if (!this.isEditAction) {
      this.student.residanat = new Residanat();
    }
    if (this.isEditAction) {
      this.isNationalExam = this.student.residanat.national_exam !== null;
      if (this.isNationalExam) {
        setTimeout(function () {
          baseContext.initResultExam();
          baseContext.initDateExam();
        }, 20);
      }
      if (this.student.residanat.id_result === 2) {
        setTimeout(function () {
          baseContext.initSpecialitySelect();
        }, 20);
      }

      for (let i = 0; i < this.student.residanat.semesters.length; i++) {
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

  constructor(private stoarageService: StorageService,
              private studentFileService: StudentFileService,
              private router: Router,
              private userService: UserService) {
  }

  private initYearSelect() {
    const year = jQuery(".select-year");
    const baseContext = this;
    year.select2();

    year.on("change", function () {
      baseContext.student.residanat.year = +jQuery(this).val();
    });

    if (this.isEditAction) {
      setTimeout(function () {
        year.val(baseContext.student.residanat.year).trigger("change");
      }, 10);
    }
  }

  private getAllResults() {
    this.busy = this.studentFileService.getAllResults()
      .subscribe(
        (data) => {
          this.results = data;

          if (this.isEditAction) {
            const baseContext = this;
            const result = jQuery(".select-result");
            setTimeout(function () {
              result.val(baseContext.student.residanat.id_result).trigger("change");
            }, 10);
          }
          if (this.isNationalExam) {
            const baseContext = this;
            const result = jQuery(".select-result-exam");
            setTimeout(function () {
              result.val(baseContext.student.residanat.national_exam.id_result).trigger("change");
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
      baseContext.student.residanat.id_result = +jQuery(this).val();

      if (baseContext.student.residanat.id_result === 2) {
        setTimeout(function () {
          baseContext.initSpecialitySelect();
        }, 20);
      } else {
        baseContext.student.residanat.national_exam = null;
        baseContext.student.residanat.semesters = [];
        baseContext.isNationalExam = false;
      }
    })
  }

  private getAllSpecialities() {
    this.busy = this.studentFileService.getAllSpecialities()
      .subscribe(
        (data) => {
          this.specialities = data;

          if (this.isEditAction && this.student.residanat.id_result === 2) {
            const baseContext = this;
            const speciality = jQuery(".select-specialite");
            setTimeout(function () {
              speciality.val(baseContext.student.residanat.id_Specialite).trigger("change");
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
      baseContext.student.residanat.id_Specialite = +jQuery(this).val();
    })
  }

  addSemester() {

    this.submitted = true;
    console.log(this.isChampFulled());
    if (!this.isChampFulled()) {
      return;
    }
    this.submitted = false;
    this.student.residanat.semesters.push(new Semester());

    this.initSelectsSemester(this.student.residanat.semesters.length - 1, 50);
  }

  removeSemester() {
    this.student.residanat.semesters.pop();
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
      baseContext.student.residanat.semesters[index].start_date = Utils.convertDateServer(jQuery(this).val());
    });
    endDate.on("change", function () {
      baseContext.student.residanat.semesters[index].end_date = Utils.convertDateServer(jQuery(this).val());
    });

    if (this.isEditAction) {
      startDate.val(Utils.convertDate(baseContext.student.residanat.semesters[index].start_date)).trigger("change");
      endDate.val(Utils.convertDate(baseContext.student.residanat.semesters[index].end_date)).trigger("change");
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
    this.busy = this.studentFileService.getAllHopitaux()
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
    this.studentFileService.getAllServices()
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
    this.studentFileService.getAllUniversities()
      .subscribe(
        (data) => {
          this.universities = data;

          this.settingInSelect("university");
        },
        (error) => {

        }
      )
  }

  initSpecialitySelectSemester(index: number) {
    /* const specialite = jQuery(".select-specialite" + "_" + index);
     const baseContext = this;
     specialite.select2();

     specialite.on("change", function () {
     baseContext.student.residanat.semesters[index].id_Specialite = +jQuery(this).val();
     })*/
  }

  initUniversitySelect(index: number) {
    const university = jQuery(".select-university" + "_" + index);
    const baseContext = this;
    university.select2();

    university.on("change", function () {
      baseContext.student.residanat.semesters[index].id_university = +jQuery(this).val();
    })
  }

  initHopitalSelect(index: number) {
    const hopital = jQuery(".select-hopital" + "_" + index);
    const baseContext = this;
    hopital.select2();

    hopital.on("change", function () {
      baseContext.student.residanat.semesters[index].id_Hopital = +jQuery(this).val();
    })
  }


  initServiceSelect(index: number) {
    const service = jQuery(".select-service" + "_" + index);
    const baseContext = this;
    service.select2();

    service.on("change", function () {
      baseContext.student.residanat.semesters[index].id_Service = +jQuery(this).val();
    })
  }

  private isChampFulled() {

    if (!this.student.residanat.year || !this.student.residanat.id_result) {
      return false;
    }
    const semesters = this.student.residanat.semesters;
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
    console.log(this.student.residanat);

    if (!this.isChampFulled()) {
      return;
    }
    this.busy = this.studentFileService.editResidanatInformation(this.student.residanat)
      .subscribe(
        (data) => {
          console.log(data);
          this.student.residanat = data;
          this.stoarageService.write("student", this.student);

          swal({
            title: "Succès!",
            text: 'Ajout Concours Residanat avec succées',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
          this.router.navigate(["/student-file"]);
        },
        (error) => {

        }
      );

  }

  private settingInSelect(name: string) {
    const baseContext = this;

    if (baseContext.isEditAction) {
      setTimeout(function () {
        for (let i = 0; i < baseContext.student.residanat.semesters.length; i++) {
          const select = jQuery(".select-" + name + "_" + i);
          const value = baseContext.getValue(name, i);
          select.val(value).trigger("change");
        }
      }, 20);

    }
  }

  getValue(name: string, index: number) {
    switch (name) {
      case  "hopital" : {
        return this.student.residanat.semesters[index].id_Hopital;
      }
      /* case "specialite" : {
       return this.student.residanat.semesters[index].id_Specialite;
       }*/
      case "university" : {
        return this.student.residanat.semesters[index].id_university;
      }
      case "service" : {
        return this.student.residanat.semesters[index].id_Service;
      }
    }
  }

  addNationalExam() {
    const baseContext = this;

    this.isNationalExam = !this.isNationalExam;

    if (this.isNationalExam) {
      baseContext.student.residanat.national_exam = new NationalExam();
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
      baseContext.student.residanat.national_exam.id_result = +jQuery(this).val();
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
      baseContext.student.residanat.national_exam.date = Utils.convertDateServer(jQuery(this).val());
    });

    if (this.isEditAction) {
      dateExam.val(Utils.convertDate(baseContext.student.residanat.national_exam.date)).trigger("change");
    }
  }
}


