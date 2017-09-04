import {Component, Input, OnInit} from "@angular/core";
import {Student} from "../../../shared/models/student";
import {StorageService} from "../../../shared/services/storage.service";
import {InitialPreviewConfig, Utils} from "../../../shared/utils";
import {Bac} from "app/shared/models/bac";
import {StudentFileService} from "../../../shared/services/student-file.service";
import {Mention} from "../../../shared/models/mention";
import {Type} from "../../../shared/models/type";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {Country} from "../../../shared/models/country";
import {City} from "../../../shared/models/city";
import {AdminService} from "../../../shared/services/admin.service";
import {Config} from "../../../shared/config";
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'app-student-bac-info',
  templateUrl: 'bac-info.component.html',
  styleUrls: [],
})
export class BacInfoComponent implements OnInit {
  @Input()
  student: Student;
  @Input()
  isAdmin: boolean;
  submitted: boolean;
  years: number[] = [];
  mentions: Mention[] = [];
  types: Type[] = [];
  editAction: boolean;
  busy: Subscription;

  countries: Country[] = [];
  cities: City[] = [];


  ngOnInit() {


    this.editAction = this.student.bac != null;
    if (!this.editAction) {
      this.student.bac = new Bac();
    }
    this.years = Utils.getYears(1990);
    this.initializeYearSelect();
    this.initializeTypeSelect();
    this.initializeMentionSelect();
    this.initializeCountrySelect();
    this.getAllTypes();
    this.getAllMentions();
    this.getAllCountries();


    if (!this.student.bac.medias) {
      Utils.initializeUploadFile(Config.baseUrl + "/student/" + this.student.id_student + "/bac/upload",
        this.userService.getTokent(), ".file-input-student-bac-medias", this.isAdmin, this.isAdmin, 1);
      this.student.bac.medias = [];
    } else {
      this.initStudentBacMedias();
    }

    const baseContext = this;
    jQuery('.file-input-student-bac-medias').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      if (!baseContext.student.bac.medias) {
        baseContext.student.bac.medias = [];
      }
      baseContext.student.bac.medias.push(data.response.media);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo de votre BAC',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    }).on('filedeleted', function (event, key, jqXHR, data) {
      const medias = [];
      baseContext.student.bac.medias.forEach(function (media) {
        medias.push(media.path);
      });
      const index = medias.indexOf(jqXHR.responseJSON.media, 0);
      if (index > -1) {
        baseContext.student.bac.medias.splice(index, 1);
      }
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé une des photos de votre BAC',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });

    if (!this.isAdmin) {
      jQuery('#formBacInfo').find('input, textarea, button, select').attr('disabled', 'disabled');
    }
  }

  constructor(private stoarageService: StorageService,
              private studentFileService: StudentFileService,
              private router: Router,
              private userService: UserService,
              private adminService: AdminService) {

  }


  validationBac() {
    this.submitted = true;
    console.log(this.student.bac);
    const bac: Bac = this.student.bac;
    if (!bac.id_mention || !bac.id_type || !bac.year || !bac.school || !bac.average) {
      return;
    }
    bac.id_student = this.student.id_student;
    const baseContext = this;
    this.busy = this.studentFileService.editBacInformation(this.student.id_student, bac)
      .subscribe(
        (data) => {
          data.id_student = this.student.id_student;
          this.student.bac = data;
          swal({
            title: "Succès!",
            text: 'Bac ' + baseContext.editAction ? 'Editée' : 'ajoutée' + ' avec succées',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });

        },
        (error) => {

        }
      )
  }

  initializeYearSelect() {
    const selectYear = jQuery(".select-year");
    selectYear.select2();
    const baseContext = this;

    selectYear.on("change", function () {
      baseContext.student.bac.year = +jQuery(this).val();
    });

    if (this.editAction) {
      setTimeout(function () {
        selectYear.val(baseContext.student.bac.year).trigger("change");
      }, 50);

    }
  }

  private getAllTypes() {
    const baseContext = this;
    this.studentFileService.getAllTypes()
      .subscribe(
        (data) => {
          this.types = data;

          if (this.editAction) {
            setTimeout(function () {
              const selectType = jQuery(".select-type");
              selectType.val(baseContext.student.bac.id_type).trigger("change");
            }, 50);
          }
        },
        (error) => {

        }
      )
  }

  private getAllMentions() {
    const baseContext = this;
    this.studentFileService.getAllMentions()
      .subscribe(
        (data) => {
          this.mentions = data;
          if (this.editAction) {
            setTimeout(function () {
              const selectMention = jQuery(".select-mention");
              selectMention.val(baseContext.student.bac.id_mention).trigger("change");
            }, 50);
          }
        },
        (error) => {

        }
      )
  }

  private initializeTypeSelect() {
    const selectType = jQuery(".select-type");
    selectType.select2();
    const baseContext = this;

    selectType.on("change", function () {
      baseContext.student.bac.id_type = +jQuery(this).val();
    });
  }

  private initializeMentionSelect() {
    const selectMention = jQuery(".select-mention");
    selectMention.select2();
    const baseContext = this;

    selectMention.on("change", function () {
      baseContext.student.bac.id_mention = +jQuery(this).val();
    });
  }

  private getAllCountries() {
    const baseContext = this;
    const paysSelect = jQuery(".select-pays");
    this.studentFileService.getAllCountries()
      .subscribe(
        (data) => {
          this.countries = data;
          if (this.editAction) {
            setTimeout(function () {
              paysSelect.val(baseContext.student.bac.city.country.Code).trigger("change");
            }, 50);
          }
        },
        (error) => {

        }
      )
  }


  public initializeCountrySelect() {
    const baseContext = this;
    const paysSelect = jQuery(".select-pays");
    const villeSelect = jQuery(".select-ville");


    paysSelect.select2();
    villeSelect.select2();


    villeSelect.on("change", function () {
      baseContext.student.bac.id_city = +villeSelect.val();
    });
    paysSelect.on("change", function () {
      baseContext.studentFileService.getCitiesByCountry(paysSelect.val())
        .subscribe(
          (data) => {
            baseContext.cities = data;

            if (baseContext.editAction) {
              setTimeout(function () {
                villeSelect.val(baseContext.student.bac.id_city).trigger("change");
              }, 50);
            }
          },
          (error) => {

          }
        )
    })


  }


  private initStudentBacMedias() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    this.student.bac.medias.forEach(function (media) {
      medias.push(media.path);
      inputMedias.push(Config.baseUrl + '/' + media.path);
      initialPreviewConfig.push({
        type: Utils.loadTypeFromExtension(media.path.substr(media.path.indexOf('.') + 1)),
        filetype: Utils.loadFileTypeFromExtension(media.path.substr(media.path.indexOf('.') + 1)),
        key: media.id_Bac_Media,
        url: Config.baseUrl + '/' + media.path + '/delete',
        size: media.size
      });
    });
    Utils.initializeUploadFile(Config.baseUrl + "/student/" + this.student.id_student + "/bac/upload",
      this.userService.getTokent(), ".file-input-student-bac-medias", this.isAdmin, this.isAdmin, 2, inputMedias, initialPreviewConfig);
  }
}


