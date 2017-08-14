import {Component, OnInit} from "@angular/core";
import {StudentService} from "../../shared/services/student.service";
import {Student} from "../../shared/models/student";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../shared/utils";
import {AdminService} from "../../shared/services/admin.service";
import {StorageService} from "../../shared/services/storage.service";
declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  selectedStudent:Student= new Student();
  students: Array<Student>;
  busy: Subscription;
  emailToSend: string;
  isReviewingMode = false;

  constructor(private studentService: StudentService, private adminService: AdminService, private storageService: StorageService) {
    this.isReviewingMode = <boolean>this.storageService.read('isReviewingMode');
  }

  ngOnInit() {
    const baseContext = this;
    this.busy = this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
      setTimeout(function () {
        Utils.initializeDataTables(700, 6);
      }, 100);
    });
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
      baseContext.storageService.write('isReviewingMode', data);
    });

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

  openModalEmail(index : number){
    this.selectedStudent= this.students[index];
    jQuery("#modal_form_vertical").modal();

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
            text: "Vous avez annuler cette action",
            confirmButtonColor: "#2196F3",
            type: "error"
          });
        }
      });
  }

  sendMail(){
    const baseContext = this;
    this.busy = this.studentService.sendMail(baseContext.selectedStudent.id_student, baseContext.emailToSend).subscribe(data => {
      swal({
        title: "Succés!",
        text: 'Message envoyé avec succès',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
    jQuery("#modal_form_vertical").modal("hide");

  }
}
