import {Component, OnInit} from "@angular/core";
import {StudentService} from "../../shared/services/student.service";
import {Student} from "../../shared/models/student";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../shared/utils";
import {AdminService} from "../../shared/services/admin.service";
import {NgBusyModule} from "ng-busy";
import {StorageService} from "../../shared/services/storage.service";
import {ConversationService} from "../../shared/services/conversation.service";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as FileSaver from "file-saver";
import {Admin} from "../../shared/models/admin";
import {Level} from "../../shared/models/level";
import {StudentFileService} from "../../shared/services/student-file.service";
declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  selectedStudent: Student = new Student();
  students: Array<Student>;
  busy: Subscription;
  emailToSend: string;
  topicToSend: string;
  isReviewingMode = false;
  isSuperAdmin: boolean;

  requestedStatus = 0;
  evaluateurs: Admin[] = [];
  fixStudents: Student[] = [];
  isAdmin: boolean;

  niveaux: Level[] = [];
  selectedLevel: number = 0;
  private sub: any;

  constructor(private studentService: StudentService,
              private studentFileService: StudentFileService,
              private adminService: AdminService,
              private userService: UserService,
              private router: Router,
              private conversationservice: ConversationService,
              private storageService: StorageService,
              private route: ActivatedRoute) {
    this.isReviewingMode = <boolean>this.storageService.read('isReviewingMode');
    if (router.url.indexOf('valid') > -1) {
      this.requestedStatus = 1;
    } else if (router.url.indexOf('current') > -1) {
      this.requestedStatus = 0;
    }
  }

  ngOnInit() {
    const baseContext = this;

    jQuery(".switch").bootstrapSwitch().on('switchChange.bootstrapSwitch', function (e, data) {
      if (data) {
        baseContext.adminService.startReviewingStudents().subscribe(() => {
          console.log('startReviewingStudents');
        });
      } else {
        baseContext.adminService.finishReviewingStudents().subscribe(() => {
          console.log('finishReviewingStudents');
        });
      }
      baseContext.storageService.write('isReviewingMode', data.toString());
    });
    this.isSuperAdmin = this.checkIfAdminHasRole(1);
    console.log(this.isSuperAdmin);


    setTimeout(function () {
      baseContext.initializeSelectAdmin();
      baseContext.initializeSelectLevel();
    }, 20);

    this.adminService.getAdminByPrivileges(2)
      .subscribe(
        (data) => {
          this.evaluateurs = data;
        },
        (error) => {

        }
      );


    this.getAllLevels();
    this.isAdmin = this.userService.checkIfAdminHasRole(1);

    this.sub = this.route.queryParams.subscribe(params => {

        if (!params["level"]) {
          this.busy = this.studentService.getAllStudentsByStatus(this.requestedStatus).subscribe(data => {
            this.students = data;
            this.fixStudents = data;
            this.students.forEach(student => {
              student.numberStatusZero = Utils.getNumberStatus(student.validations, 0);
            });
            console.log("transmit");
            Utils.initializeDataTables(300, 7, 5);
          });
        } else {


          this.selectedLevel = params["level"];
          this.busy = this.studentService.getAllStudentsByLevel(this.requestedStatus, params["level"])
            .subscribe(
              (data) => {
                this.students = data;
                this.fixStudents = data;
                this.students.forEach(student => {
                  student.numberStatusZero = Utils.getNumberStatus(student.validations, 0);
                });
                Utils.initializeDataTables(300, 7, 5);
              }
            )
        }
      }
    );


  }

  getAllLevels() {
    const baseContext = this;
    this.studentFileService.getAllLevels()
      .subscribe(
        (data) => {
          this.niveaux = [];

          if (this.userService.checkIfOnlyAdminHasRole(2)) {
            for (let i = 0; i < 5; i++) {
              this.niveaux.push(data[i]);
            }
          } else if (this.userService.checkIfOnlyAdminHasRole(3)) {
            for (let i = 5; i < 12; i++) {
              this.niveaux.push(data[i]);
            }
          } else {
            this.niveaux = data;
          }

          const selectLevel = jQuery(".select-level");
          setTimeout(function () {
            selectLevel.val(baseContext.selectedLevel + "").trigger("change");
          }, 100);


        },
        (error) => {

        }
      )
  }

  selectLevel(levelId: number) {
    this.selectedLevel = levelId;
    const baseContext = this;
    if (levelId === 0) {
      this.busy = this.studentService.getAllStudentsByStatus(this.requestedStatus).subscribe(data => {
        this.students = data;
        this.fixStudents = data;
        this.students.forEach(student => {
          student.numberStatusZero = Utils.getNumberStatus(student.validations, 0);
        });
        Utils.reInitializeDataTables(300, 7);
      });
    } else {
      this.busy = this.studentService.getAllStudentsByLevel(this.requestedStatus, levelId)
        .subscribe(
          (data) => {
            this.students = data;
            this.fixStudents = data;
            this.students.forEach(student => {
              student.numberStatusZero = Utils.getNumberStatus(student.validations, 0);
            });
            Utils.reInitializeDataTables(300, 7);
          }
        )
    }
  }


  updateStudentStatusAfterReview(index: number, administrationReview: number) {
    const student: Student = this.students[index];
    this.busy = this.studentService.updateStudentStatusAfterReview(student.id_student, administrationReview).subscribe(data => {
      student.administration_review = administrationReview;
      swal({
        title: "Succées!",
        text: "Le status du dossier de cet étudiant est modifié.",
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
  }

  openModalEmail(index: number) {
    this.selectedStudent = this.students[index];
    jQuery("#modal_form_vertical").modal();

  }

  openModalScholar(index: number) {
    const baseContext = this;
    this.selectedStudent = this.students[index];
    jQuery("#modal_scholarite").modal();

    setTimeout(function () {
      baseContext.initializeScholarSelect();
    }, 20);
  }

  initializeScholarSelect() {
    const selectScholar = jQuery(".select-scholoarite");
    selectScholar.select2();
  }

  deleteStudent(index: number) {
    const baseContext = this;
    const student: Student = this.students[index];
    swal({
        title: "Vous êtes sûr?",
        text: "Cet étudiant va être supprimer définitivement!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "Oui, supprimer!",
        cancelButtonText: "Non, annuler!",
        closeOnConfirm: true,
        closeOnCancel: true
      },
      function (isConfirm) {
        if (isConfirm) {
          baseContext.busy = baseContext.studentService.deleteStudent(student.id_student).subscribe(data => {
            baseContext.students.splice(index, 1);
            swal({
              title: "Supprimé!",
              text: "Cet étudiant est supprimé.",
              confirmButtonColor: "#66BB6A",
              type: "success"
            });
          }, error => {

          });
        } else {
          swal({
            title: "Annulé",
            text: "Vous avez annulé cette action",
            confirmButtonColor: "#2196F3",
            type: "error"
          });
        }
      });
  }

  checkIfAdminHasRole(roleId: number) {

    return this.userService.checkIfAdminHasRole(roleId);
  }

  generatePDF(index: number) {
    this.adminService.generatePDFStudent(this.students[index].id_student)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, this.students[index].first_name + " " + this.students[index].last_name + "_Dossier.pdf");
        },
        (error) => {

        }
      )
  }

  affectScholar() {
    const baseContext = this;
    const selectScholar = jQuery(".select-scholoarite");

    jQuery("#modal_scholarite").modal("hide");
    if (+selectScholar.val() !== 0) {
      this.busy = this.adminService.affectScholarToStudent(this.selectedStudent.id_student,
        +selectScholar.val())
        .subscribe(
          (data) => {
            swal({
              title: "Succées!",
              text: "L'affectation est réalisée avec succées.",
              confirmButtonColor: "#66BB6A",
              type: "success"
            });
          },
          (error) => {
            swal({
              title: "Erreur!",
              text: "Erreur d'affectation",
              confirmButtonColor: "#66BB6A",
              type: "error"
            });
          }
        )
    } else {
      swal({
        title: "Erreur!",
        text: "Pas d'affectation",
        confirmButtonColor: "#66BB6A",
        type: "error"
      });
    }
  }

  sendMail() {
    const baseContext = this;
    /*
     this.studentService.sendMail(baseContext.selectedStudent.id_student, baseContext.emailToSend).subscribe(data => {

     });
     */
    jQuery("#modal_form_vertical").modal("hide");
    this.busy = this.conversationservice.startConversation(this.selectedStudent.id_student,
      this.userService.loggedAdmin.id_admin, baseContext.emailToSend, baseContext.topicToSend).subscribe(data => {
      swal({
          title: "Succés!",
          text: 'Message envoyé avec succès, voulez-vous ouvrir le conversation ?',
          type: "success",
          showCancelButton: true,
          confirmButtonColor: "#66BB6A",
          confirmButtonText: "Oui, ouvrir!",
          cancelButtonText: "Non, merci!",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function (isConfirm) {
          if (isConfirm) {
            baseContext.router.navigateByUrl('/support/messages/' + data.conversation.id_Conversation + '/discussion')
          }
        });
    });
    this.emailToSend = '';
    this.topicToSend = '';
  }

  getNumberStatus(index: number) {
    console.log(index);
    return Utils.getNumberStatus(this.students[index].validations, 0);
  }

  private initializeSelectAdmin() {
    const selectAdmin = jQuery(".select-evaluateur");
    const baseContext = this;
    selectAdmin.select2();

    selectAdmin.on("change", function () {
      baseContext.students = [];
      if (+jQuery(this).val() == 0) {
        baseContext.students = baseContext.fixStudents;
      } else {
        baseContext.fixStudents.forEach(student => {
          if (student.id_evaluateur === +jQuery(this).val()) {
            baseContext.students.push(student);
          }
        });
      }
      Utils.reInitializeDataTables(50, 6);
    });
  }

  downloadStudentsExcel() {
    this.busy = this.adminService.generateStudentsExcel()
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, 'Liste Etudiants.xls');
        },
        (error) => {

        }
      );

  }

  initializeSelectLevel() {
    const selectLevel = jQuery(".select-level");
    const baseContext = this;
    selectLevel.select2();
    console.log(baseContext.selectedLevel);


    selectLevel.val(baseContext.selectedLevel + "").trigger("change");

    selectLevel.on("change", function () {
      console.log("Change");
      console.log(jQuery(this).val());
      if (+jQuery(this).val() && baseContext.selectedLevel !== +jQuery(this).val())
        if (baseContext.requestedStatus === 0) {
          baseContext.router.navigate(["/student/list-current"], {queryParams: {level: +jQuery(this).val()}});
        } else {
          baseContext.router.navigate(["/student/list-valid"], {queryParams: {level: +jQuery(this).val()}});
        }
      baseContext.selectedLevel = +jQuery(this).val();
    });
  }
}
