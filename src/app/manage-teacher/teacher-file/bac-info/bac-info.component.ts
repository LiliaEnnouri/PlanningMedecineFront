import {Component, Input, OnInit} from "@angular/core";
import {StorageService} from "../../../shared/services/storage.service";
import {InitialPreviewConfig, Utils} from "../../../shared/utils";
import {Bac} from "app/shared/models/bac";
import {Mention} from "../../../shared/models/mention";
import {Type} from "../../../shared/models/type";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {Country} from "../../../shared/models/country";
import {City} from "../../../shared/models/city";
import {InscriptionService} from "../../../shared/services/inscription.service";
import {Config} from "app/shared/config";
import {Teacher} from "../../../shared/models/Teacher";
import {TeacherFileService} from "../../../shared/services/teacher-file.service";
import {SharedService} from "../../../shared/services/shared.service";
declare let jQuery: any;
declare let swal: any;
@Component({
  selector: 'app-bac-component',
  templateUrl: 'bac-info.component.html',
  styleUrls: [],

})
export class BacInfoComponent implements OnInit {
  @Input()
  teacher: Teacher;
  submitted: boolean;
  years: number[] = [];
  mentions: Mention[] = [];
  types: Type[] = [];
  editAction: boolean;
  busy: Subscription;
  @Input()
  isAdmin: boolean;

  countries: Country[] = [];
  cities: City[] = [];

  ngOnInit() {

    this.teacher = <Teacher>this.storageService.read("teacher");
    this.editAction = this.teacher.bac != null;
    if (!this.editAction) {
      this.teacher.bac = new Bac();
    }
    this.years = Utils.getYears(1960);
    this.initializeYearSelect();
    this.initializeTypeSelect();
    this.initializeMentionSelect();
    this.initializeCountrySelect();
    this.getAllTypes();
    this.getAllMentions();
    this.getAllCountries();

    if (!this.teacher.bac.medias) {
      Utils.initializeUploadFile(Config.baseUrl + "/admin/teacher/" + this.teacher.id_Teacher + "/bac/upload",
        this.userService.getTokent(), ".file-input-teacher-bac-medias", this.isAdmin, this.isAdmin, 2);
      this.teacher.bac.medias = [];
    } else {
      this.initTeacherBacMedias();
    }

    const baseContext = this;
    jQuery('.file-input-teacher-bac-medias').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      if (!baseContext.teacher.bac.medias) {
        baseContext.teacher.bac.medias = [];
      }
      baseContext.teacher.bac.medias.push(data.response.media);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo de votre BAC',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    }).on('filedeleted', function (event, key, jqXHR, data) {
      const medias = [];
      baseContext.teacher.bac.medias.forEach(function (media) {
        medias.push(media.path);
      });
      const index = medias.indexOf(jqXHR.responseJSON.media, 0);
      if (index > -1) {
        baseContext.teacher.bac.medias.splice(index, 1);
      }
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé une des photos de votre BAC',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
  }

  constructor(private storageService: StorageService,
              private teacherFileService: TeacherFileService,
              private router: Router,
              private userService: UserService,
              private inscriptionService: InscriptionService,
              private sharedService: SharedService) {

  }


  validationBac() {
    this.submitted = true;
    const bac: Bac = this.teacher.bac;
    if (!bac.id_mention || !bac.id_type || !bac.year || !bac.school || !bac.average) {
      return;
    }

    bac.id_Teacher = this.teacher.id_Teacher;
    const baseContext = this;
    const medias = [];
    this.teacher.bac.medias.forEach(function (media) {
      medias.push(media.path);
    });
    if (medias.length === 0) {
      swal({
        title: "Erreur!",
        text: "Vous devez uploader votre Attestation de réussite et votre Relevé des notes",
        confirmButtonColor: "#EF5350",
        type: "error"
      });
      return;
    }
    bac.medias = medias;
    console.log(JSON.stringify(bac));
    this.busy = this.teacherFileService.editBacInformation(bac, this.teacher.id_Teacher)
      .subscribe(
        (data) => {
          data.id_Teacher = this.teacher.id_Teacher;
          this.teacher.bac = data;
          swal({
            title: "Succès!",
            text: 'Bac ' + baseContext.editAction ? 'Section éditée' : 'ajoutée' + ' avec succées',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
          this.router.navigate(["/teacher-file"]);
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
      baseContext.teacher.bac.year = +jQuery(this).val();
    });

    if (this.editAction) {
      setTimeout(function () {
        selectYear.val(baseContext.teacher.bac.year).trigger("change");
      }, 50);

    }
  }

  private getAllTypes() {
    const baseContext = this;
    this.sharedService.getAllTypes()
      .subscribe(
        (data) => {
          this.types = data;

          if (this.editAction) {
            setTimeout(function () {
              const selectType = jQuery(".select-type");
              selectType.val(baseContext.teacher.bac.id_type).trigger("change");
            }, 50);
          }
        },
        (error) => {

        }
      )
  }

  private getAllMentions() {
    const baseContext = this;
    this.sharedService.getAllMentions()
      .subscribe(
        (data) => {
          this.mentions = data;
          if (this.editAction) {
            setTimeout(function () {
              const selectMention = jQuery(".select-mention");
              selectMention.val(baseContext.teacher.bac.id_mention).trigger("change");
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
      baseContext.teacher.bac.id_type = +jQuery(this).val();
    });
  }

  private initializeMentionSelect() {
    const selectMention = jQuery(".select-mention");
    selectMention.select2();
    const baseContext = this;

    selectMention.on("change", function () {
      baseContext.teacher.bac.id_mention = +jQuery(this).val();
    });
  }

  private getAllCountries() {
    const baseContext = this;
    const paysSelect = jQuery(".select-pays");
    this.sharedService.getAllCountries()
      .subscribe(
        (data) => {
          this.countries = data;
          if (this.editAction) {
            setTimeout(function () {
              paysSelect.val(baseContext.teacher.bac.city.country.Code).trigger("change");
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
      baseContext.teacher.bac.id_city = +villeSelect.val();
    });
    paysSelect.on("change", function () {
      baseContext.sharedService.getCitiesByCountry(paysSelect.val())
        .subscribe(
          (data) => {
            baseContext.cities = data;

            if (baseContext.editAction) {
              setTimeout(function () {
                villeSelect.val(baseContext.teacher.bac.id_city).trigger("change");
              }, 50);
            }
          },
          (error) => {

          }
        )
    })
  }

  private initTeacherBacMedias() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    this.teacher.bac.medias.forEach(function (media) {
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
    Utils.initializeUploadFile(Config.baseUrl + "/admin/teacher/" + this.teacher.id_Teacher + "/bac/upload",
      this.userService.getTokent(), ".file-input-teacher-bac-medias",
      this.isAdmin, this.isAdmin, 2, inputMedias, initialPreviewConfig);
  }

}


