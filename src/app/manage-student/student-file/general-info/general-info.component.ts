import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Student} from "../../../shared/models/student";
import {Country} from "../../../shared/models/country";
import {InscriptionService} from "../../../shared/services/inscription.service";
import {City} from "../../../shared/models/city";
import {Utils} from "../../../shared/utils";
import {University} from "../../../shared/models/university";
import {Subscription} from "rxjs/Subscription";
import {StorageService} from "../../../shared/services/storage.service";
import {UserService} from "../../../shared/services/user.service";
import {StudentFileService} from "../../../shared/services/student-file.service";
import {SectionValidation} from "../../../shared/models/section-validation";
import {AdminService} from "../../../shared/services/admin.service";
import {PassportStudent} from "app/shared/models/Passport_Student";
import {CinStudent} from "../../../shared/models/cinStudent";
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'app-student-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css'],
})
export class GeneralInfoComponent implements OnInit {

  @Input()
  student: Student;

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
    if (!this.isAdmin) {
      jQuery('#formGeneralInfo').find('input, textarea, button, select').attr('disabled', 'disabled');
    }


  }

  constructor(private router: Router,
              private studentFileService: StudentFileService,
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
    jQuery(".radioBox-oriented").uniform({
      radioClass: 'choice'
    });
    jQuery(".radioBox-civil").uniform({
      radioClass: 'choice'
    });

    if (baseContext.student.sex) {
      jQuery('#' + baseContext.student.sex).prop('checked', true);
      jQuery.uniform.update('#' + baseContext.student.sex);
    }
    if (baseContext.student.oriented) {
      jQuery('#' + baseContext.student.oriented).prop('checked', true);
      jQuery.uniform.update('#' + baseContext.student.oriented);
    }
    if (baseContext.student.civil_status) {
      console.log("Etat civil");
      console.log(baseContext.student.civil_status);
      jQuery('.radioBox-civil[value=' + baseContext.student.civil_status + ']').prop('checked', true);
      jQuery.uniform.update('.radioBox-civil[value=' + baseContext.student.civil_status + ']');
    }
    jQuery(".radioBox-sex").on("change", function () {
      baseContext.student.sex = jQuery(this).val();
    });
    jQuery(".radioBox-oriented").on("change", function () {
      baseContext.student.oriented = jQuery(this).val();
    });
    jQuery(".radioBox-civil").on("change", function () {
      baseContext.student.civil_status = +jQuery(this).val();
    });
  }

  settingInformation() {

    if (!this.student.cin)
      this.student.cin = new CinStudent();
    if (!this.student.passport)
      this.student.passport = new PassportStudent();
    this.student.label_address = this.student.adress.label_address;
    this.student.address_city = this.student.adress.id_adress;
    this.student.postal_code = this.student.adress.postal_code;

    if (this.student.oriented) {
      jQuery(".checkbox").prop('checked', true).uniform('refresh');
    }
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
      baseContext.student.birthday = Utils.convertDateServer(jQuery(".date_naissance").val());
    });

    if (this.editAction) {
      const date = Utils.convertDate(this.student.birthday);
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
      baseContext.student.cin.date = Utils.convertDateServer(dateCIN.val());
    });

    if (this.editAction) {
      dateCIN.val(Utils.convertDate(this.student.cin.date)).trigger("change");
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
      baseContext.student.passport.date = Utils.convertDateServer(datePassport.val());
    });

    if (this.editAction) {
      datePassport.val(Utils.convertDate(this.student.passport.date)).trigger("change");
    }
  }

  getAllCountries() {
    const baseContext = this;
    const paysSelect = jQuery(".select-pays");
    const paysSelectNaissance = jQuery(".select-pays-naissance");

    const paysCIN = jQuery(".select-pays-cin");
    const paysPassport = jQuery(".select-pays-passport");
    this.inscriptionService.getAllCountries()
      .subscribe(
        (data) => {
          this.countries = data;
          if (this.editAction) {
            setTimeout(function () {
              paysSelect.val(baseContext.student.adress.city.country.Code).trigger("change");
            }, 50);
            setTimeout(function () {
              paysSelectNaissance.val(baseContext.student.city_birth.CountryCode).trigger("change");
            }, 50);
            if (baseContext.student.cin.city)
              setTimeout(function () {
                paysCIN.val(baseContext.student.cin.city.CountryCode).trigger("change");
              }, 50);
            if (baseContext.student.passport.city)
              setTimeout(function () {
                paysPassport.val(baseContext.student.passport.city.CountryCode).trigger("change");
              }, 50);
          }
        }
      )
  }

  public registerStudent() {
    this.submitted = true;

    if (!this.student.first_name
      || !this.student.last_name
      || !this.student.birthday
      || !this.student.address_city
      || !this.student.birthday_city
      || (!this.student.cin.code && !this.student.passport.code)
      || (this.student.cin.code && (!this.student.cin.id_city || !this.student.cin.date))
      || (this.student.passport.code && (!this.student.passport.id_city || !this.student.passport.date))
      || !this.student.email || !this.student.mobile || !this.student.label_address
      || !this.student.oriented
      || !this.student.study_access_year
      || !this.student.first_name_arabe
      || !this.student.last_name_arabe) {
      return;
    }
    console.log(JSON.stringify(this.student));
    this.busy = this.studentFileService.editInformations(this.student)
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
      baseContext.student.birthday_city = +villeSelectNaissance.val();
    });

    paysSelectNaissance.select2();

    paysSelectNaissance.on("change", function () {
      baseContext.inscriptionService.getCitiesByCountry(paysSelectNaissance.val())
        .subscribe(
          (data) => {
            baseContext.citiesNaissance = data;
            if (baseContext.editAction) {
              setTimeout(function () {
                villeSelectNaissance.val(baseContext.student.city_birth.id_City).trigger("change");
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
      baseContext.student.address_city = +villeSelect.val();
    });
    paysSelect.on("change", function () {
      baseContext.inscriptionService.getCitiesByCountry(paysSelect.val())
        .subscribe(
          (data) => {
            baseContext.cities = data;

            if (baseContext.editAction) {
              setTimeout(function () {
                villeSelect.val(baseContext.student.adress.city.id_City).trigger("change");
              }, 50);
            }
          }
        )
    });

    /* University Year */
    universityYear.select2();
    universityYear.on("change", function () {
      baseContext.student.study_access_year = jQuery(this).val();
    });
    if (this.editAction) {
      setTimeout(function () {
        universityYear.val(baseContext.student.study_access_year).trigger("change");
      }, 20);
    }
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
      baseContext.inscriptionService.getCitiesByCountry(paysCIN.val())
        .subscribe(
          (data) => {
            baseContext.citiesCIN = data;
            if (baseContext.editAction) {
              setTimeout(function () {
                villeCIN.val(baseContext.student.cin.id_city).trigger("change");
              }, 100);
            }
          },
          (error) => {

          }
        )
    });
    villeCIN.on("change", function () {
      baseContext.student.cin.id_city = +villeCIN.val();
    });


    paysPassport.on("change", function () {
      baseContext.inscriptionService.getCitiesByCountry(paysPassport.val())
        .subscribe(
          (data) => {
            baseContext.citiesPassport = data;
            if (baseContext.editAction) {
              setTimeout(function () {
                villePassport.val(baseContext.student.passport.id_city).trigger("change");
              }, 100);
            }
          },
          (error) => {

          }
        )
    });

    villePassport.on("change", function () {
      baseContext.student.passport.id_city = +villePassport.val();
    });
  }


  private getAllUniversities() {
    const selectUniversity = jQuery(".select-university");
    const baseContext = this;
    this.studentFileService.getAllUniversities()
      .subscribe(
        (data) => {
          this.universities = data;
          setTimeout(function () {
            selectUniversity.val(baseContext.student.id_origin_university).trigger("change");
          }, 50);
        }
      )
  }

  goStudentFile() {
    this.router.navigate(["/student/liste"]);
  }

}


