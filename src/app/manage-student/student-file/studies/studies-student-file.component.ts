import {Component, OnInit} from "@angular/core";
import {Student} from "../../../shared/models/student";
import {StorageService} from "../../../shared/services/storage.service";
import {InitialPreviewConfig, Utils} from "../../../shared/utils";
import {Subscription} from "rxjs/Subscription";
import {Result} from "../../../shared/models/result";
import {StudentFileService} from "../../../shared/services/student-file.service";
import {University} from "../../../shared/models/university";
import {Study} from "../../../shared/models/study";
import {Level} from "../../../shared/models/level";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {Credit} from "../../../shared/models/credit";
import {Config} from "../../../shared/config";
import set = Reflect.set;
declare var jQuery: any;
declare var swal: any;
@Component({
  templateUrl: 'studies-student-file.component.html',
  styleUrls: [],
})
export class StudiesStudentFileComponent implements OnInit {

  student: Student;
  years: string[] = [];
  submitted: boolean;
  busy: Subscription;
  results: Result[] = [];
  levels: Level[] = [];
  universities: University[] = [];
  editAction: boolean;
  credits: Credit[] = [];

  ngOnInit() {
    const baseContext = this;
    this.student = <Student>this.stoarageService.read("student");
    this.years = Utils.getUniversityYears(1990);

    this.editAction = this.student.studies.length !== 0;

    if (!this.editAction) {
      console.log("new");
      const study = new Study();
      study.year = this.student.study_access_year;
      this.student.studies.push(study);
      this.initSelect2(0, 10);
      this.initStudyFileInput(0);
    } else {
      for (let i = 0; i < this.student.studies.length; i++) {
        this.initSelect2(i, 10);
        if (this.student.studies[i].id_result === 3) {
          setTimeout(function () {
            baseContext.initCreditSelect(i);
          }, 10);
        }
        this.initStudyFileInput(i);
      }
      this.makeChangeYears();
    }

    this.getAllResults();
    this.getAllUniversities();
    this.getAllLevels();
    this.getAllCredits();
  }

  constructor(private stoarageService: StorageService,
              private studentFileServie: StudentFileService,
              private router: Router,
              private userService: UserService) {

  }


  private getAllResults() {
    const baseContext = this;
    this.studentFileServie.getAllResults()
      .subscribe(
        (data) => {
          this.results = data;

          if (this.editAction) {
            for (let i = 0; i < this.student.studies.length; i++) {
              setTimeout(function () {
                const selectResult = jQuery(".select-result_" + i);
                selectResult.val(baseContext.student.studies[i].id_result).trigger("change");
              }, 50);
            }
          }
        },
        (error) => {

        }
      )
  }

  private getAllUniversities() {
    const baseContext = this;
    this.studentFileServie.getAllUniversities()
      .subscribe(
        (data) => {
          this.universities = data;

          if (this.editAction) {
            for (let i = 0; i < this.student.studies.length; i++) {
              setTimeout(function () {
                const selectUniversity = jQuery(".select-university_" + i);
                selectUniversity.val(baseContext.student.studies[i].id_university).trigger("change");
              }, 50);
            }
          }
        },
        (error) => {

        }
      )
  }

  private getAllLevels() {
    const baseContext = this;
    this.studentFileServie.getAllLevels()
      .subscribe(
        (data) => {
          this.levels = data;


          if (this.editAction) {
            for (let i = 0; i < this.student.studies.length; i++) {
              setTimeout(function () {
                const selectUniversity = jQuery(".select-level_" + i);
                selectUniversity.val(baseContext.student.studies[i].id_level).trigger("change");
              }, 50);
            }
          }
        },
        (error) => {

        }
      )
  }

  private initResultSelect(index: number) {
    const selectResult = jQuery(".select-result" + "_" + index);
    selectResult.select2();

    const baseContext = this;
    selectResult.on("change", function () {
      baseContext.student.studies[index].id_result = +jQuery(this).val();

      if (baseContext.student.studies[index].id_result === 3) {
        setTimeout(function () {
          baseContext.initCreditSelect(index);
        }, 20);
      }
    });
  }

  private initUniversitySelect(index: number) {
    const selectUniversity = jQuery(".select-university" + "_" + index);
    selectUniversity.select2();

    const baseContext = this;
    selectUniversity.on("change", function () {
      baseContext.student.studies[index].id_university = +jQuery(this).val();
    });
  }

  private initLevelSelect(index: number) {
    const selectLevel = jQuery(".select-level" + "_" + index);
    selectLevel.select2();

    const baseContext = this;
    selectLevel.on("change", function () {
      baseContext.student.studies[index].id_level = +jQuery(this).val();
    });
  }

  private initYearSelect(index: number) {
    const selectYear = jQuery(".select-year" + "_" + index);
    selectYear.select2();

    const baseContext = this;
    selectYear.on("change", function () {
      baseContext.student.studies[index].year = jQuery(this).val();
    });
    if (!this.editAction) {
      selectYear.val(this.student.studies[0].year).trigger("change");
    }
  }

  validationStudies() {
    const baseContext = this;
    this.submitted = true;
    if (!this.isChampFulled()) {
      return;
    }
    console.log(JSON.stringify(this.student.studies));
    this.busy = this.studentFileServie.editStudiesInformation(this.student.studies)
      .subscribe(
        (data) => {
          this.student.studies = data;
          this.stoarageService.write("student", this.student);
          swal({
            title: "Succès!",
            text: 'Etudes médicales antérieures ' + (baseContext.editAction ? 'Editée' : 'ajoutée') + ' avec succées',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
          this.router.navigate(["/student-file"]);
        }
      )
  }

  addStudy() {
    this.submitted = true;
    console.log(this.isChampFulled());
    if (!this.isChampFulled()) {
      return;
    }
    this.submitted = false;
    this.student.studies.push(new Study());
    this.initSelect2(this.student.studies.length - 1, 50);
    this.initStudyFileInput(this.student.studies.length - 1);
  }

  private isChampFulled() {
    for (let i = 0; i < this.student.studies.length; i++) {
      if (!this.student.studies[i].id_level ||
        !this.student.studies[i].id_result ||
        !this.student.studies[i].year ||
        !this.student.studies[i].id_university) {
        return false;
      }
    }
    return true;
  }

  private initSelect2(index: number, timout: number) {
    const baseContext = this;
    setTimeout(function () {
      baseContext.initResultSelect(index);
      baseContext.initUniversitySelect(index);
      baseContext.initLevelSelect(index);
      baseContext.initYearSelect(index);
    }, timout);
  }

  removeStudy() {
    this.student.studies.splice(this.student.studies.length - 1, 1);
  }

  private makeChangeYears() {
    const baseContext = this;
    for (let i = 0; i < this.student.studies.length; i++) {
      setTimeout(function () {
        const selectYear = jQuery(".select-year_" + i);
        selectYear.val(baseContext.student.studies[i].year).trigger("change");
      }, 50);
    }
  }

  private getAllCredits() {
    const baseContext = this;
    this.studentFileServie.getAllCredits()
      .subscribe(
        (data) => {
          this.credits = data;
          if (this.editAction) {
            // TODO
          }
        }
      )
  }

  initCreditSelect(index: number) {
    const selectCredit = jQuery(".select-credit" + "_" + index);
    selectCredit.select2();

    const baseContext = this;
    selectCredit.on("change", function () {
      baseContext.student.studies[index].id_credit = +jQuery(this).val();
    });

    if (baseContext.editAction && baseContext.student.studies[index].id_credit) {
      selectCredit.val(baseContext.student.studies[index].id_credit).trigger("change");
    }
  }

  initStudyFileInput(index: number) {
    const token = <string>this.userService.getTokent();
    if (this.editAction && this.student.studies[index].medias) {
      const medias = [];
      const inputMedias = [];
      const initialPreviewConfig: InitialPreviewConfig[] = [];
      this.student.studies[index].medias.forEach(function (media) {
        medias.push(media.media_Path);
        inputMedias.push(Config.baseUrl + '/' + media.media_Path);
        initialPreviewConfig.push({
          type: Utils.loadTypeFromExtension(media.media_Path.substr(media.media_Path.indexOf('.') + 1)),
          filetype: Utils.loadFileTypeFromExtension(media.media_Path.substr(media.media_Path.indexOf('.') + 1)),
          key: media.id_Banque_Media,
          url: Config.baseUrl + '/' + media.media_Path + '/delete',
          size: media.size
        });
      });
      this.student.studies[index].medias = medias;
      setTimeout(function () {
        Utils.initializeUploadFile(Config.baseUrl + "/student/me/studies/upload",
          token, ".file-input-study-" + index, 5, inputMedias, initialPreviewConfig);
      }, 100);
    } else {
      setTimeout(function () {
        Utils.initializeUploadFile(Config.baseUrl + "/student/me/studies/upload",
          token, ".file-input-study-" + index, 5);
      }, 100);
    }
    const baseContext = this;
    setTimeout(function () {
      jQuery('.file-input-study-' + index).change(function () {
        console.log('file input change');
      }).on('fileuploaded', function (event, data, previewId, i) {
        baseContext.student.studies[index].medias.push(data.response.media);
        console.log(data.response.media);
      }).on('filedeleted', function (event, key, jqXHR, data) {
        console.log(jqXHR.responseJSON.media);
        const ind = baseContext.student.studies[index].medias.indexOf(jqXHR.responseJSON.media, 0);
        if (ind > -1) {
          baseContext.student.studies[index].medias.splice(ind, 1);
        }
      });
    }, 500);
  }
}

