import {Component, Input, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Mention} from "../../../shared/models/mention";
import {University} from "../../../shared/models/university";
import {Doctaurat} from "../../../shared/models/doctaurat";
import {Teacher} from "../../../shared/models/Teacher";
import {SharedService} from "../../../shared/services/shared.service";
import {TeacherFileService} from "../../../shared/services/teacher-file.service";
declare let jQuery;
declare let swal;

@Component({
  selector: 'app-doctaurat-component',
  templateUrl: 'doctaurat-teacher-file.component.html'
})
export class DoctauratTeacherFileComponent implements OnInit {

  @Input()
  teacher: Teacher;
  @Input()
  isAdmin: boolean;
  doctaurat: Doctaurat;
  busy: Subscription;
  mentions: Array<Mention>;
  universities: Array<University>;
  submitted = false;
  isEditAction;

  constructor(private teacherFileService: TeacherFileService,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.isEditAction = this.teacher.doctaurat !== null;
    if (!this.isEditAction) {
      this.doctaurat = new Doctaurat();
    } else {
      this.doctaurat = this.teacher.doctaurat;
    }
    this.initUniversities();
    this.initMentions();
    this.initDatePicker();
  }

  private initUniversities() {
    const selectUniversity = jQuery(".select-university");
    selectUniversity.select2();
    selectUniversity.on("change", function () {
      baseContext.doctaurat.id_university = +jQuery(this).val();
    });
    const baseContext = this;
    this.sharedService.getAllUniversities()
      .subscribe(
        (data) => {
          this.universities = data;
          if (this.isEditAction) {
            setTimeout(function () {
              selectUniversity.val(baseContext.doctaurat.university.id_university).trigger("change");
            }, 100);
          }
        }
      )
  }

  private initMentions() {
    const selectMention = jQuery(".select-mention");
    selectMention.select2();
    selectMention.on("change", function () {
      baseContext.doctaurat.id_mention = +jQuery(this).val();
    });
    const baseContext = this;
    this.sharedService.getAllMentions()
      .subscribe(
        (data) => {
          this.mentions = data;
          if (this.isEditAction) {
            setTimeout(function () {
              selectMention.val(baseContext.doctaurat.mention.id_mention).trigger("change");
            }, 100);
          }
        }
      )
  }

  submitdoctaurat() {
    this.submitted = true;
    const baseContext = this;

    if (!this.doctaurat.numero
      || !this.doctaurat.id_university
      || !this.doctaurat.date_of_pitch
      || !this.doctaurat.id_mention) {
      return;
    }
    this.busy = this.teacherFileService.editDoctaurat(this.doctaurat, this.teacher.id_Teacher)
      .subscribe(
        (data) => {
          swal({
            title: "Succès!",
            text: 'Partie Doctaurat ' + (baseContext.isEditAction ? 'Editée' : 'ajoutée') + ' avec succés',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
        },
        (error) => {

        }
      )
  }

  private initDatePicker() {
    const baseContext = this;
    jQuery('.date-doctaurat').daterangepicker({
      "singleDatePicker": true,
      "timePicker": false,
      "timePicker24Hour": true,
      "timePickerIncrement": 15,
      "maxDate": new Date(),
      "locale": {
        "format": "YYYY-MM-DD"
      }
    }).on("change", function () {
      baseContext.doctaurat.date_of_pitch = jQuery(".date-doctaurat").val();
    });
    if (this.isEditAction) {
      jQuery(".date-doctaurat").val(baseContext.doctaurat.date_of_pitch);
    }
  }

  reinitialiseDoctaurat() {
    const baseContext = this;
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel pls!",
        closeOnConfirm: true,
        closeOnCancel: true
      },
      function (isConfirm) {

        if (isConfirm) {
          baseContext.busy = baseContext.teacherFileService.removeDoctaurat(this.teacher.id_Teacher)
            .subscribe(
              (data) => {
                swal({
                  title: "Succès!",
                  text: 'La réinitialisation est éffectué avec succées',
                  confirmButtonColor: "#66BB6A",
                  type: "success"
                });
              },
              (error) => {

              }
            )
        } else {
          swal({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            confirmButtonColor: "#2196F3",
            type: "error"
          });
        }
      });
  }
}
