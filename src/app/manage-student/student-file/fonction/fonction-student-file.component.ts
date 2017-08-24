import {Component, Input, OnInit} from "@angular/core";
import {Student} from "../../../shared/models/student";
import {StorageService} from "../../../shared/services/storage.service";
import {Utils} from "../../../shared/utils";
import {Subscription} from "rxjs/Subscription";
import {Result} from "../../../shared/models/result";
import {StudentFileService} from "../../../shared/services/student-file.service";
import {University} from "../../../shared/models/university";
import {Level} from "../../../shared/models/level";
import {Router} from "@angular/router";
import {Fonction} from "../../../shared/models/fonction";
import {InscriptionService} from "../../../shared/services/inscription.service";
import {Country} from "../../../shared/models/country";
import {UserService} from "../../../shared/services/user.service";
import {FonctionType} from "../../../shared/models/FonctionType";
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'app-student-fonction',
  templateUrl: 'fonction-student-file.component.html',
  styleUrls: [],

})
export class FonctionStudentFileComponent implements OnInit {

  @Input()
  student: Student;
  submitted: boolean;
  busy: Subscription;
  results: Result[] = [];
  levels: Level[] = [];
  universities: University[] = [];
  editAction: boolean;
  countries: Country[];
  fonction_types: FonctionType[];

  ngOnInit() {
    const baseContext = this;
    this.editAction = this.student.fonctions.length !== 0;

    if (!this.editAction) {
      console.log("new");
      this.student.fonctions.push(new Fonction());
      this.initSelect2(0, 10);
    } else {
      for (let i = 0; i < this.student.fonctions.length; i++) {
        this.initSelect2(i, 10);
      }
      this.makeChangeYears();
    }

    this.getAllCountries();
    this.getAllFonctionTypes();

  }

  constructor(private storageService: StorageService,
              private studentFileService: StudentFileService,
              private router: Router,
              private inscriptionService: InscriptionService,
              private userService: UserService) {

  }

  private getAllFonctionTypes() {
    const baseContext = this;
    this.studentFileService.getAllFonctionTypes()
      .subscribe(
        (data) => {
          this.fonction_types = data;
          this.storageService.write('fonction_types', data);
          if (this.editAction) {
            setTimeout(function () {
              for (let i = 0; i < baseContext.student.fonctions.length; i++) {
                setTimeout(function () {
                  const selectFonctionTypes = jQuery(".select-fonction-type-" + i);
                  selectFonctionTypes.val(baseContext.student.fonctions[i].id_Fonction_Type).trigger("change");
                }, 50);
              }
            }, 100);
          }
        }, error => {
          if (!this.fonction_types) {
            this.fonction_types = <Array<FonctionType>> this.storageService.read('fonction_types');
            if (this.editAction) {
              setTimeout(function () {
                for (let i = 0; i < baseContext.student.fonctions.length; i++) {
                  setTimeout(function () {
                    const selectFonctionTypes = jQuery(".select-fonction-type-" + i);
                    selectFonctionTypes.val(baseContext.student.fonctions[i].id_Fonction_Type).trigger("change");
                  }, 50);
                }
              }, 100);
            }
          }
        }
      )
  }

  private getAllResults() {
    const baseContext = this;
    this.studentFileService.getAllResults()
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
    this.studentFileService.getAllUniversities()
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


  private initResultSelect(index: number) {
    const selectResult = jQuery(".select-result" + "_" + index);
    selectResult.select2();

    const baseContext = this;
    selectResult.on("change", function () {
      baseContext.student.studies[index].id_result = +jQuery(this).val();
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


  validationFonctions() {
    const baseContext = this;
    this.submitted = true;
    if (!this.isChampFulled()) {
      return;
    }
    this.busy = this.studentFileService.editFonctionInformation(this.student.id_student, this.student.fonctions)
      .subscribe(
        (data) => {
          this.student.fonctions = data;
          swal({
            title: "Succès!",
            text: 'Fonctions ' + (baseContext.editAction ? 'Editée' : 'ajoutée') + ' avec succées',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
        },
        (error) => {

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
    this.student.fonctions.push(new Fonction());
    this.initSelect2(this.student.fonctions.length - 1, 50);
  }

  private isChampFulled() {
    console.log(this.student.fonctions);
    for (let i = 0; i < this.student.fonctions.length; i++) {
      if (!this.student.fonctions[i].employer ||
        !this.student.fonctions[i].nature ||
        !this.student.fonctions[i].date_of_inauguration ||
        ((!this.student.fonctions[i].address ||
        !this.student.fonctions[i].address.address_city) && (!this.student.fonctions[i].address ||
        !this.student.fonctions[i].address.city))) {
        return false;
      }
    }
    return true;
  }

  private initSelect2(index: number, timout: number) {
    const baseContext = this;
    setTimeout(function () {
      baseContext.initDate(index);
      baseContext.initAdressSelect(index);
    }, timout);


  }

  removeStudy() {
    this.student.fonctions.splice(this.student.fonctions.length - 1, 1);
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

  initDate(index: number) {
    const baseContext = this;
    const dateIngauration = jQuery(".date-inaug" + "_" + index);

    dateIngauration.daterangepicker({
      "singleDatePicker": true,
      "timePicker": false,
      "timePicker24Hour": true,
      "showDropdowns": true,
      "timePickerIncrement": 15,
      "locale": {
        "format": "DD/MM/YYYY"
      }
    });

    dateIngauration.val('');

    dateIngauration.on("change", function () {
      baseContext.student.fonctions[index].date_of_inauguration
        = Utils.convertDateServer(jQuery(this).val());
    });

    if (this.editAction) {
      if (baseContext.student.fonctions[index].date_of_inauguration) {
        const date = Utils.convertDate(baseContext.student.fonctions[index].date_of_inauguration);
        dateIngauration.val(date).trigger("change");
      }
    }
  }

  initAdressSelect(index: number) {
    const baseContext = this;
    const paysSelect = jQuery(".select-pays_" + index);
    const villeSelect = jQuery(".select-ville_" + index);


    paysSelect.select2();
    villeSelect.select2();


    paysSelect.on("change", function () {
      baseContext.inscriptionService.getCitiesByCountry(paysSelect.val())
        .subscribe(
          (data) => {
            baseContext.student.fonctions[index].cities = data;

            if (baseContext.editAction) {
              console.log("trigger");
              setTimeout(function () {
                villeSelect.val(baseContext.student.fonctions[index].address.city.id_City).trigger("change");
              }, 60);

            }
          },
          (error) => {

          }
        )
    });
    villeSelect.on("change", function () {
      baseContext.student.fonctions[index].address.address_city = +villeSelect.val();
    });


  }

  private getAllCountries() {
    const baseContext = this;
    this.inscriptionService.getAllCountries()
      .subscribe(
        (data) => {
          this.countries = data;

          if (this.editAction) {
            for (let i = 0; i < this.student.fonctions.length; i++) {
              console.log(baseContext.student.fonctions[i].address);
              const paysSelect = jQuery(".select-pays" + "_" + i);
              setTimeout(function () {
                paysSelect.val(baseContext.student.fonctions[i].address.city.CountryCode).trigger("change");
              }, 50);

            }
          }

        }

        ,
        (error) => {

        }
      )

  }
}


