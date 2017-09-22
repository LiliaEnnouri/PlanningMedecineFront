import {Component, Input, OnInit} from "@angular/core";
import {StorageService} from "../../../shared/services/storage.service";
import {Utils} from "../../../shared/utils";
import {Subscription} from "rxjs/Subscription";
import {Result} from "../../../shared/models/result";
import {University} from "../../../shared/models/university";
import {Level} from "../../../shared/models/level";
import {Router} from "@angular/router";
import {Fonction} from "../../../shared/models/fonction";
import {Country} from "../../../shared/models/country";
import {FonctionType} from "../../../shared/models/FonctionType";
import {TeacherFileService} from "../../../shared/services/teacher-file.service";
import {SharedService} from "../../../shared/services/shared.service";
import {Teacher} from "../../../shared/models/Teacher";
declare let jQuery: any;
declare let swal: any;
@Component({
  selector: 'app-fonction-component',
  templateUrl: 'fonction-teacher-file.component.html',
  styleUrls: [],

})
export class FonctionTeacherFileComponent implements OnInit {

  @Input()
  teacher: Teacher;

  @Input()
  isAdmin: boolean;
  submitted: boolean;
  busy: Subscription;
  results: Result[] = [];
  levels: Level[] = [];
  universities: University[] = [];
  editAction: boolean;
  countries: Country[];
  fonction_types: FonctionType[];

  ngOnInit() {
    this.editAction = this.teacher.fonctions.length !== 0;

    if (!this.editAction) {
      this.teacher.fonctions.push(new Fonction());
      this.initSelect2(0, 10);
    } else {
      for (let i = 0; i < this.teacher.fonctions.length; i++) {
        this.initSelect2(i, 10);
      }
    }

    this.getAllCountries();
    this.getAllFonctionTypes();
  }

  constructor(private storageService: StorageService,
              private teacherFileService: TeacherFileService,
              private router: Router,
              private sharedService: SharedService) {

  }

  private getAllFonctionTypes() {
    const baseContext = this;
    this.sharedService.getAllFonctionTypes()
      .subscribe(
        (data) => {
          this.fonction_types = data;
          this.storageService.write('fonction_types', data);
          if (this.editAction) {
            setTimeout(function () {
              for (let i = 0; i < baseContext.teacher.fonctions.length; i++) {
                setTimeout(function () {
                  const selectFonctionTypes = jQuery(".select-fonction-type-" + i);
                  selectFonctionTypes.val(baseContext.teacher.fonctions[i].id_Fonction_Type).trigger("change");
                }, 50);
              }
            }, 100);
          }
        }, error => {
          if (!this.fonction_types) {
            this.fonction_types = <Array<FonctionType>> this.storageService.read('fonction_types');
            if (this.editAction) {
              setTimeout(function () {
                for (let i = 0; i < baseContext.teacher.fonctions.length; i++) {
                  setTimeout(function () {
                    const selectFonctionTypes = jQuery(".select-fonction-type-" + i);
                    selectFonctionTypes.val(baseContext.teacher.fonctions[i].id_Fonction_Type).trigger("change");
                  }, 50);
                }
              }, 100);
            }
          }
        }
      )
  }


  validationFonctions() {
    const baseContext = this;
    this.submitted = true;
    if (!this.isChampFulled()) {
      return;
    }
    this.busy = this.teacherFileService.editFonctionInformation(this.teacher.fonctions, this.teacher.id_Teacher)
      .subscribe(
        (data) => {
          this.teacher.fonctions = data;
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
    this.teacher.fonctions.push(new Fonction());
    this.initSelect2(this.teacher.fonctions.length - 1, 50);
  }

  private isChampFulled() {
    for (let i = 0; i < this.teacher.fonctions.length; i++) {
      if (!this.teacher.fonctions[i].employer || !this.teacher.fonctions[i].id_Fonction_Type ||
        !this.teacher.fonctions[i].nature ||
        !this.teacher.fonctions[i].date_of_inauguration ||
        ((!this.teacher.fonctions[i].address ||
        !this.teacher.fonctions[i].address.address_city) && (!this.teacher.fonctions[i].address ||
        !this.teacher.fonctions[i].address.city))) {
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
      baseContext.initFonctionTypeSelect(index);
    }, timout);


  }

  removeStudy() {
    this.teacher.fonctions.splice(this.teacher.fonctions.length - 1, 1);
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
      baseContext.teacher.fonctions[index].date_of_inauguration
        = Utils.convertDateServer(jQuery(this).val());
    });

    if (this.editAction) {
      if (baseContext.teacher.fonctions[index].date_of_inauguration) {
        const date = Utils.convertDate(baseContext.teacher.fonctions[index].date_of_inauguration);
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
      baseContext.sharedService.getCitiesByCountry(paysSelect.val())
        .subscribe(
          (data) => {
            baseContext.teacher.fonctions[index].cities = data;

            if (baseContext.editAction) {
              console.log("trigger");
              setTimeout(function () {
                villeSelect.val(baseContext.teacher.fonctions[index].address.city.id_City).trigger("change");
              }, 60);

            }
          },
          (error) => {

          }
        )
    });
    villeSelect.on("change", function () {
      baseContext.teacher.fonctions[index].address.address_city = +villeSelect.val();
    });
  }

  initFonctionTypeSelect(index: number) {
    const baseContext = this;
    const selectFonctionType = jQuery(".select-fonction-type-" + index);

    selectFonctionType.select2();

    selectFonctionType.on("change", function () {
      baseContext.teacher.fonctions[index].id_Fonction_Type = +selectFonctionType.val();
    });
  }

  private getAllCountries() {
    const baseContext = this;
    this.sharedService.getAllCountries()
      .subscribe(
        (data) => {
          this.countries = data;

          if (this.editAction) {
            for (let i = 0; i < this.teacher.fonctions.length; i++) {
              const paysSelect = jQuery(".select-pays" + "_" + i);
              setTimeout(function () {
                paysSelect.val(baseContext.teacher.fonctions[i].address.city.CountryCode).trigger("change");
              }, 50);

            }
          }
        },
        (error) => {

        }
      )

  }
}


