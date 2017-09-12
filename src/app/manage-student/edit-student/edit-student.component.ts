import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Student} from "../../shared/models/student";
import {StudentService} from "../../shared/services/student.service";
import {UserService} from "../../shared/services/user.service";
import {Utils} from "../../shared/utils";
import {SharedService} from "../../shared/services/shared.service";
import {Level} from "../../shared/models/level";
declare let jQuery: any;
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  student: Student;
  busy: Subscription;
  isAdmin: boolean;
  niveaux: Level [] = [];
  studentId: number;
  selectedLevel: number;

  constructor(private  route: ActivatedRoute,
              private userService: UserService,
              private studentService: StudentService,
              private sharedService: SharedService,
              private router: Router) {

  }

  ngOnInit() {

    this.isAdmin = this.userService.checkIfAdminHasRole(1);

    this.initSelectLevel();
    this.route.params.subscribe(
      params => {
        const id_student = +params["studentId"];
        this.studentId = id_student;
        this.busy = this.studentService.getStudentById(id_student).subscribe(data => {
          data.isNew = Utils.verifyNewStudent(data.study_access_year);
          this.student = data;
        });
      });

    this.sharedService.getAllLevels()
      .subscribe(
        (data) => {
          this.niveaux = data;
        },
        (error) => {

        }
      )

    this.studentService.getLevelStudent(this.studentId)
      .subscribe(
        (data) => {

          const baseContext = this;
          console.log(data.level);
          this.selectedLevel = data.level;
          setTimeout(function () {
            const selectLevel = jQuery(".select-level");
            selectLevel.val(data.level + "").trigger("change");
          }, 400);

        },
        (error) => {

        }
      )
  }

  private initSelectLevel() {
    const selectLevel = jQuery(".select-level");
    const baseContext = this;
    selectLevel.select2();


    selectLevel.on("change", function () {
      if (baseContext.selectedLevel !== +jQuery(this).val()) {
        baseContext.router.navigate(["/student/list-current"], {queryParams: {level: +jQuery(this).val()}});
      }
    });
  }
}
