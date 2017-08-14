import {Component, Input, OnInit} from "@angular/core";
import {Student} from "../../../shared/models/student";
import {StorageService} from "../../../shared/services/storage.service";
import {Utils} from "../../../shared/utils";
import {Bac} from "app/shared/models/bac";
import {StudentFileService} from "../../../shared/services/student-file.service";
import {Mention} from "../../../shared/models/mention";
import {Type} from "../../../shared/models/type";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
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
  submitted: boolean;
  years: number[] = [];
  mentions: Mention[] = [];
  types: Type[] = [];
  editAction: boolean;
  busy: Subscription;

  ngOnInit() {

    this.editAction = this.student.bac != null;
    if (!this.editAction) {
      this.student.bac = new Bac();
    }
    this.years = Utils.getYears(1990);
    this.initializeYearSelect();
    this.initializeTypeSelect();
    this.initializeMentionSelect();
    this.getAllTypes();
    this.getAllMentions();

  }

  constructor(private stoarageService: StorageService,
              private studentFileService: StudentFileService,
              private router: Router,
              private userService: UserService) {

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
}

