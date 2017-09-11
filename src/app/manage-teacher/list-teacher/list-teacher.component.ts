import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../shared/utils";
import {AdminService} from "../../shared/services/admin.service";
import {StorageService} from "../../shared/services/storage.service";
import {ConversationService} from "../../shared/services/conversation.service";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as FileSaver from "file-saver";
import {Admin} from "../../shared/models/admin";
import {StudentFileService} from "../../shared/services/student-file.service";
import {Teacher} from "../../shared/models/Teacher";
import {TeacherService} from "../../shared/services/teacher.service";
declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {
  selectedTeacher: Teacher = new Teacher();
  teachers: Array<Teacher>;
  busy: Subscription;
  emailToSend: string;
  topicToSend: string;
  isReviewingMode = false;
  isSuperAdmin: boolean;

  requestedStatus = 0;
  evaluateurs: Admin[] = [];
  fixTeachers: Teacher[] = [];
  isAdmin: boolean;


  constructor(private teacherService: TeacherService,
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
    }, 20);

    this.adminService.getAdminByPrivileges(2)
      .subscribe(
        (data) => {
          this.evaluateurs = data;
        },
        (error) => {

        }
      );


    this.isAdmin = this.userService.checkIfAdminHasRole(1);
    this.busy = this.teacherService.getAllTeachersByStatus(this.requestedStatus).subscribe(data => {
      this.teachers = data;
      this.fixTeachers = data;
      this.teachers.forEach(teacher => {
        teacher.numberStatusZero = Utils.getNumberStatus(teacher.validations, 0);
      });
      Utils.initializeDataTables(300, 7);
    });

  }


  updateStudentStatusAfterReview(index: number, administrationReview: number) {
    const teacher: Teacher = this.teachers[index];
    this.busy = this.teacherService.updateTeacherStatusAfterReview(teacher.id_Teacher, administrationReview).subscribe(data => {
      teacher.administration_review = administrationReview;
      swal({
        title: "Succées!",
        text: "Le status du dossier de cet étudiant est modifié.",
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
  }

  openModalEmail(index: number) {
    this.selectedTeacher = this.teachers[index];
    jQuery("#modal_form_vertical").modal();

  }

  openModalScholar(index: number) {
    const baseContext = this;
    this.selectedTeacher = this.teachers[index];
    jQuery("#modal_scholarite").modal();

    setTimeout(function () {
      baseContext.initializeScholarSelect();
    }, 20);
  }

  initializeScholarSelect() {
    const selectScholar = jQuery(".select-scholoarite");
    selectScholar.select2();
  }

  deleteTeacher(index: number) {
    const baseContext = this;
    const teacher: Teacher = this.teachers[index];
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
          baseContext.busy = baseContext.teacherService.deleteTeacher(teacher.id_Teacher).subscribe(data => {
            baseContext.teachers.splice(index, 1);
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
    this.adminService.generatePDFStudent(this.teachers[index].id_Teacher)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, this.teachers[index].first_name + " " + this.teachers[index].last_name + "_Dossier.pdf");
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
      this.busy = this.adminService.affectScholarToStudent(this.selectedTeacher.id_Teacher,
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
    this.busy = this.conversationservice.startConversation(this.selectedTeacher.id_Teacher,
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
    return Utils.getNumberStatus(this.teachers[index].validations, 0);
  }

  private initializeSelectAdmin() {
    const selectAdmin = jQuery(".select-evaluateur");
    const baseContext = this;
    selectAdmin.select2();

    selectAdmin.on("change", function () {
      baseContext.teachers = [];
      if (+jQuery(this).val() === 0) {
        baseContext.teachers = baseContext.fixTeachers;
      } else {
        baseContext.fixTeachers.forEach(teacher => {
          if (teacher.id_Teacher === +jQuery(this).val()) {
            baseContext.teachers.push(teacher);
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

}
