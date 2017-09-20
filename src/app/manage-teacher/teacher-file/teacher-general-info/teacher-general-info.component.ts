import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Country} from "../../../shared/models/country";
import {InscriptionService} from "../../../shared/services/inscription.service";
import {City} from "../../../shared/models/city";
import {Utils} from "../../../shared/utils";
import {University} from "../../../shared/models/university";
import {Subscription} from "rxjs/Subscription";
import {StorageService} from "../../../shared/services/storage.service";
import {UserService} from "../../../shared/services/user.service";
import {SectionValidation} from "../../../shared/models/section-validation";
import {AdminService} from "../../../shared/services/admin.service";
import {Teacher} from "../../../shared/models/Teacher";
import {CinTeacher} from "../../../shared/models/cinTeacher";
import {PassportTeacher} from "../../../shared/models/Passport_Teacher";
import {SharedService} from "../../../shared/services/shared.service";
import {TeacherFileService} from "../../../shared/services/teacher-file.service";
import {Specialite} from "../../../shared/models/specialite";
import {Service} from "../../../shared/models/service";
import {Grade} from "../../../shared/models/grade";
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'app-teacher-general-info',
  templateUrl: './teacher-general-info.component.html',
  styleUrls: ['./teacher-general-info.component.css'],
})
export class TeacherGeneralInfoComponent implements OnInit {

  @Input()
  teacher: Teacher;

  @Input()
  isAdmin: boolean;

  busy: Subscription;
  countries: Country[] = [];
  cities: City[] = [];
  citiesNaissance: City[] = [];
  submitted: boolean;
  universities: University[] = [];
  editAction: boolean;
  citiesCIN: City[] = [];
  citiesPassport: City[] = [];
  uni_years: string[] = [];


  specialites: Specialite[] = [];
  grades: Grade[] = [];
  services: Service[] = [];

  /* Admin special */
  statusSection: SectionValidation;

  ngOnInit() {
    this.editAction = this.router.url.indexOf("edit") !== -1;
    this.uni_years = Utils.getUniversityYears(1990);
    if (this.editAction) {
      this.settingInformation();
    }
    this.initializeDates();
    this.initializeRadioBox();
    this.initializeSelect2();
    this.getAllCountries();
    this.getAllUniversities();
    this.initializeInformationSelect2();
    this.getServicesGradeSpecialite();
    if (!this.isAdmin) {
      jQuery('#formGeneralInfo').find('input, textarea, button, select').attr('disabled', 'disabled');
    }


  }

  constructor(private router: Router,
              private sharedService: SharedService,
              private teacherFileService: TeacherFileService,
              private inscriptionService: InscriptionService,
              private stoarageService: StorageService,
              private userService: UserService,
              private adminService: AdminService) {
  }

  initializeRadioBox() {
    // Default initialization
    const baseContext = this;
    jQuery(".radioBox-sex").uniform({
      radioClass: 'choice'
    });
    jQuery(".radioBox-civil").uniform({
      radioClass: 'choice'
    });

    if (baseContext.teacher.sex) {
      jQuery('#' + baseContext.teacher.sex).prop('checked', true);
      jQuery.uniform.update('#' + baseContext.teacher.sex);
    }
    if (baseContext.teacher.civil_status) {
      console.log("Etat civil");
      console.log(baseContext.teacher.civil_status);
      jQuery('.radioBox-civil[value=' + baseContext.teacher.civil_status + ']').prop('checked', true);
      jQuery.uniform.update('.radioBox-civil[value=' + baseContext.teacher.civil_status + ']');
    }
    jQuery(".radioBox-sex").on("change", function () {
      baseContext.teacher.sex = jQuery(this).val();
    });
    jQuery(".radioBox-civil").on("change", function () {
      baseContext.teacher.civil_status = +jQuery(this).val();
    });
  }

  settingInformation() {

    if (!this.teacher.cin)
      this.teacher.cin = new CinTeacher();
    if (!this.teacher.passport)
      this.teacher.passport = new PassportTeacher();
    this.teacher.label_address = this.teacher.adress.label_address;
    this.teacher.address_city = this.teacher.adress.id_adress;
    this.teacher.postal_code = this.teacher.adress.postal_code;

    this.initializeDates();
  }

  initializeDates() {
    const baseContext = this;
    /* Date de naissance */
    const dateNaissance = jQuery('.date_naissance');
    dateNaissance.daterangepicker({
      "singleDatePicker": true,
      "showDropdowns": true,
      "locale": {
        "format": "DD/MM/YYYY"
      }
    });

    dateNaissance.on("change", function () {
      baseContext.teacher.birthday = Utils.convertDateServer(jQuery(".date_naissance").val());
    });

    if (this.editAction) {
      const date = Utils.convertDate(this.teacher.birthday);
      dateNaissance.val(date).trigger("change");
    }

    /* Manage Date CIN */
    const dateCIN = jQuery('.date_emition_cin');

    dateCIN.daterangepicker({
      "singleDatePicker": true,
      "showDropdowns": true,
      "locale": {
        "format": "DD/MM/YYYY"
      }
    });

    dateCIN.on("change", function () {
      baseContext.teacher.cin.date = Utils.convertDateServer(dateCIN.val());
    });

    if (this.editAction) {
      dateCIN.val(Utils.convertDate(this.teacher.cin.date)).trigger("change");
    }
    /* Manage Date Passport */
    const datePassport = jQuery('.date_emition_passport');
    datePassport.daterangepicker({
      "singleDatePicker": true,
      "showDropdowns": true,
      "locale": {
        "format": "DD/MM/YYYY"
      }
    });

    datePassport.on("change", function () {
      baseContext.teacher.passport.date = Utils.convertDateServer(datePassport.val());
    });

    if (this.editAction) {
      datePassport.val(Utils.convertDate(this.teacher.passport.date)).trigger("change");
    }
  }

  getAllCountries() {
    const baseContext = this;
    const paysSelect = jQuery(".select-pays");
    const paysSelectNaissance = jQuery(".select-pays-naissance");

    const paysCIN = jQuery(".select-pays-cin");
    const paysPassport = jQuery(".select-pays-passport");
    this.sharedService.getAllCountries()
      .subscribe(
        (data) => {
          this.countries = data;
          if (this.editAction) {
            setTimeout(function () {
              paysSelect.val(baseContext.teacher.adress.city.country.Code).trigger("change");
            }, 50);
            setTimeout(function () {
              paysSelectNaissance.val(baseContext.teacher.city_birth.CountryCode).trigger("change");
            }, 50);
            if (baseContext.teacher.cin.city)
              setTimeout(function () {
                paysCIN.val(baseContext.teacher.cin.city.CountryCode).trigger("change");
              }, 50);
            if (baseContext.teacher.passport.city)
              setTimeout(function () {
                paysPassport.val(baseContext.teacher.passport.city.CountryCode).trigger("change");
              }, 50);
          }
        }
      )
  }

  public registerTeacher() {
    this.submitted = true;

    if (!this.teacher.first_name
      || !this.teacher.last_name
      || !this.teacher.birthday
      || !this.teacher.address_city
      || !this.teacher.birthday_city
      || (!this.teacher.cin.code && !this.teacher.passport.code)
      || (this.teacher.cin.code && (!this.teacher.cin.id_city || !this.teacher.cin.date))
      || (this.teacher.passport.code && (!this.teacher.passport.id_city || !this.teacher.passport.date))
      || !this.teacher.email || !this.teacher.mobile || !this.teacher.label_address
      || !this.teacher.first_name_arabe
      || !this.teacher.last_name_arabe) {
      return;
    }
    console.log(JSON.stringify(this.teacher));
    this.busy = this.teacherFileService.editInformations(this.teacher)
      .subscribe(
        (data) => {
          data.isNew = Utils.verifyNewStudent(data.study_access_year);
          swal({
            title: "Succès!",
            text: 'Etudiant editée avec succées',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
        },
        (error) => {
          swal({
            title: "Erreur!",
            text: JSON.parse(error._body).response,
            type: "error"
          });
        });
  }

  public initializeSelect2() {
    const villeSelectNaissance = jQuery(".select-ville-naissance");
    const paysSelectNaissance = jQuery(".select-pays-naissance");
    const paysSelect = jQuery(".select-pays");
    const villeSelect = jQuery(".select-ville");
    const universityYear = jQuery(".select-university-year");

    villeSelectNaissance.select2();
    const baseContext = this;
    villeSelectNaissance.on("change", function () {
      baseContext.teacher.birthday_city = +villeSelectNaissance.val();
    });

    paysSelectNaissance.select2();

    paysSelectNaissance.on("change", function () {
      baseContext.sharedService.getCitiesByCountry(paysSelectNaissance.val())
        .subscribe(
          (data) => {
            baseContext.citiesNaissance = data;
            if (baseContext.editAction) {
              setTimeout(function () {
                villeSelectNaissance.val(baseContext.teacher.city_birth.id_City).trigger("change");
              }, 100);
            }
          },
          (error) => {

          }
        )
    });
    paysSelect.select2();
    villeSelect.select2();
    villeSelect.on("change", function () {
      baseContext.teacher.address_city = +villeSelect.val();
    });
    paysSelect.on("change", function () {
      baseContext.sharedService.getCitiesByCountry(paysSelect.val())
        .subscribe(
          (data) => {
            baseContext.cities = data;

            if (baseContext.editAction) {
              setTimeout(function () {
                villeSelect.val(baseContext.teacher.adress.city.id_City).trigger("change");
              }, 50);
            }
          }
        )
    });

    /* Manage CIN & Passport */
    const paysCIN = jQuery(".select-pays-cin");
    const paysPassport = jQuery(".select-pays-passport");
    const villeCIN = jQuery(".select-ville-cin");
    const villePassport = jQuery(".select-ville-passport");

    paysCIN.select2();
    paysPassport.select2();
    villeCIN.select2();
    villePassport.select2();

    paysCIN.on("change", function () {
      baseContext.sharedService.getCitiesByCountry(paysCIN.val())
        .subscribe(
          (data) => {
            baseContext.citiesCIN = data;
            if (baseContext.editAction) {
              setTimeout(function () {
                villeCIN.val(baseContext.teacher.cin.id_city).trigger("change");
              }, 100);
            }
          },
          (error) => {

          }
        )
    });
    villeCIN.on("change", function () {
      baseContext.teacher.cin.id_city = +villeCIN.val();
    });


    paysPassport.on("change", function () {
      baseContext.sharedService.getCitiesByCountry(paysPassport.val())
        .subscribe(
          (data) => {
            baseContext.citiesPassport = data;
            if (baseContext.editAction) {
              setTimeout(function () {
                villePassport.val(baseContext.teacher.passport.id_city).trigger("change");
              }, 100);
            }
          },
          (error) => {

          }
        )
    });

    villePassport.on("change", function () {
      baseContext.teacher.passport.id_city = +villePassport.val();
    });
  }


  initializeInformationSelect2() {
    const baseContext = this;

    setTimeout(function () {
      const selectSerivce = jQuery(".select-service");
      selectSerivce.select2();
      selectSerivce.on("change", function () {
        baseContext.teacher.id_Service = +selectSerivce.val();
      });
      const selectGrade = jQuery(".select-grade");
      selectGrade.select2();
      selectGrade.on("change", function () {
        baseContext.teacher.id_Grade = +selectGrade.val();
      });
      const selectSpecialite = jQuery(".select-specialite");
      selectSpecialite.select2();
      selectSpecialite.on("change", function () {
        baseContext.teacher.id_Specialite = +selectSpecialite.val();
      });
    }, 20);


  }

  private getServicesGradeSpecialite() {
    const selectService = jQuery(".select-service");
    const selectGrade = jQuery(".select-grade");
    const selectSpecialite = jQuery(".select-specialite");
    const baseContext = this;
    this.sharedService.getAllServices()
      .subscribe(
        (data) => {
          this.services = data;
          if (this.editAction) {
            setTimeout(function () {
              selectService.val(baseContext.teacher.id_Service).trigger("change");
            }, 50);
          }
        }
      );
    this.sharedService.getAllSpecialities()
      .subscribe(
        (data) => {
          this.specialites = data;
          if (this.editAction) {
            setTimeout(function () {
              selectSpecialite.val(baseContext.teacher.id_Specialite).trigger("change");
            }, 50);
          }
        }
      );
    this.sharedService.getAllGrades()
      .subscribe(
        (data) => {
          this.grades = data;
          if (this.editAction) {
            setTimeout(function () {
              selectGrade.val(baseContext.teacher.id_Grade).trigger("change");
            }, 50);
          }
        }
      )
  }


  private getAllUniversities() {
    const selectUniversity = jQuery(".select-university");
    const baseContext = this;
    this.sharedService.getAllUniversities()
      .subscribe(
        (data) => {
          this.universities = data;
          setTimeout(function () {
            selectUniversity.val(baseContext.teacher.id_origin_university).trigger("change");
          }, 50);
        }
      )
  }
}


