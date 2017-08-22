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
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'app-student-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: [],
})
export class GeneralInfoComponent implements OnInit {

  @Input()
  student: Student;
  busy: Subscription;
  countries: Country[] = [];
  cities: City[] = [];
  citiesNaissance: City[] = [];
  submitted: boolean;
  universities: University[] = [];
  editAction: boolean;
  uni_years: string[] = [];

  /* Admin special */
  statusSection: SectionValidation;

  ngOnInit() {
    this.editAction = this.router.url.indexOf("edit") !== -1;
    this.uni_years = Utils.getUniversityYears(1990);
    if (this.editAction) {
      this.settingInformation();
    }
    this.initializeDateNaissance();
    this.initializeRadioBox();
    this.initializeSelect2();
    this.getAllCountries();
    this.getAllUniversities();


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

    if (baseContext.student.sex) {
      jQuery('#' + baseContext.student.sex).prop('checked', true);
      jQuery.uniform.update('#' + baseContext.student.sex);
    }
    if (baseContext.student.oriented) {
      jQuery('#' + baseContext.student.oriented).prop('checked', true);
      jQuery.uniform.update('#' + baseContext.student.oriented);
    }
    jQuery(".radioBox-sex").on("change", function () {
      baseContext.student.sex = jQuery(this).val();
    });
    jQuery(".radioBox-oriented").on("change", function () {
      baseContext.student.oriented = jQuery(this).val();
    });
  }

  settingInformation() {

    this.student.label_address = this.student.adress.label_address;
    this.student.address_city = this.student.adress.id_adress;
    this.student.postal_code = this.student.adress.postal_code;

    if (this.student.oriented) {
      jQuery(".checkbox").prop('checked', true).uniform('refresh');
    }
    this.initializeDateNaissance();
  }

  initializeDateNaissance() {
    const baseContext = this;
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
  }

  getAllCountries() {
    const baseContext = this;
    const paysSelect = jQuery(".select-pays");
    const paysSelectNaissance = jQuery(".select-pays-naissance");
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
      || (!this.student.cin && !this.student.passport)
      || !this.student.email || !this.student.mobile || !this.student.label_address
      || !this.student.oriented
      || !this.student.study_access_year) {
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
      console.log("zebbi " + jQuery(this).val());
      baseContext.student.study_access_year = jQuery(this).val();
    });
    if (this.editAction) {
      setTimeout(function () {
        universityYear.val(baseContext.student.study_access_year).trigger("change");
      }, 20);
    }
  }

  initializeUniversitySelect2() {
    const baseContext = this;
    setTimeout(function () {
      const selectUniversity = jQuery(".select-university");
      selectUniversity.select2();

      selectUniversity.on("change", function () {
        baseContext.student.id_origin_university = +selectUniversity.val();
      });
    }, 20);
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


