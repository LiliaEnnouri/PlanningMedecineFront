import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../shared/services/user.service";
import {Student} from "../../../shared/models/student";
import {Subscription} from "rxjs/Subscription";
import {Mention} from "../../../shared/models/mention";
import {University} from "../../../shared/models/university";
import {StudentFileService} from "../../../shared/services/student-file.service";
import {Doctaurat} from "../../../shared/models/doctaurat";
import {StorageService} from "../../../shared/services/storage.service";
import {Router} from "@angular/router";
declare var jQuery;
declare var swal;

@Component({
  templateUrl: 'doctaurat-student-file.component.html'
})
export class DoctauratStudentFileComponent implements OnInit {

  student: Student;
  busy: Subscription;
  mentions: Array<Mention>;
  universities: Array<University>;
  submitted = false;
  isEditAction;

  constructor(private userService: UserService, private studentFileServie: StudentFileService,
              private storageService: StorageService, private router: Router) {

    this.isEditAction = this.student.doctaurat !== null;
    if (!this.isEditAction) {
      this.student.doctaurat = new Doctaurat();
    }
    console.log(this.student.doctaurat.numero);
  }

  ngOnInit(): void {
    this.initUniversities();
    this.initMentions();
    this.initDatePicker();
  }

  private initUniversities() {
    const selectUniversity = jQuery(".select-university");
    selectUniversity.select2();
    selectUniversity.on("change", function () {
      baseContext.student.doctaurat.id_university = +jQuery(this).val();
    });
    const baseContext = this;
    this.studentFileServie.getAllUniversities()
      .subscribe(
        (data) => {
          this.universities = data;
          if (this.isEditAction) {
            setTimeout(function () {
              selectUniversity.val(baseContext.student.doctaurat.university.id_university).trigger("change");
            }, 100);
          }
        }
      )
  }

  private initMentions() {
    const selectMention = jQuery(".select-mention");
    selectMention.select2();
    selectMention.on("change", function () {
      baseContext.student.doctaurat.id_mention = +jQuery(this).val();
    });
    const baseContext = this;
    this.studentFileServie.getAllMentions()
      .subscribe(
        (data) => {
          this.mentions = data;
          if (this.isEditAction) {
            setTimeout(function () {
              selectMention.val(baseContext.student.doctaurat.mention.id_mention).trigger("change");
            }, 100);
          }
        }
      )
  }

  submitdoctaurat() {
    this.submitted = true;
    const baseContext = this;
    this.busy = this.studentFileServie.editDoctaurat(this.student.doctaurat)
      .subscribe(
        (data) => {

          this.storageService.write("student", this.student);

          swal({
            title: "Succès!",
            text: 'Partie Doctaurat ' + (baseContext.isEditAction ? 'Editée' : 'ajoutée') + ' avec succés',
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
          this.router.navigate(["/student-file"]);
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
      baseContext.student.doctaurat.date_of_pitch = jQuery(".date-doctaurat").val();
    });
    if (this.isEditAction) {
      jQuery(".date-doctaurat").val(baseContext.student.doctaurat.date_of_pitch);
    }
  }
}
