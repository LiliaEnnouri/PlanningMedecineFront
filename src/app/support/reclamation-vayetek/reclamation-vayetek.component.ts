import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Config} from "../../shared/config";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {Admin} from "../../shared/models/admin";
import {ReclamationService} from "../../shared/services/reclamation.service";

declare let swal: any;
declare let jQuery;
@Component({
  templateUrl: 'reclamation-vayetek.component.html',
  styleUrls: [],

})
export class ReclamationVayetekComponent implements OnInit {
  loggedUser: Admin = new Admin();

  baseURL: string;
  busy: Subscription;
  reclamtionContent: string;
  topicToSend: string;

  ngOnInit() {
    this.loggedUser = this.userService.loggedAdmin;
  }

  constructor(private userService: UserService, private router: Router,
              private reclamationservice: ReclamationService) {
    this.baseURL = Config.baseUrl;
  }

  sendReclamation() {
    const baseContext = this;
    /*
     this.studentService.sendMail(baseContext.selectedStudent.id_student, baseContext.emailToSend).subscribe(data => {

     });
     */
    jQuery("#modal_form_vertical").modal("hide");
    this.busy = this.reclamationservice.sendMail(this.userService.loggedAdmin.id_admin, baseContext.reclamtionContent, baseContext.topicToSend).subscribe(data => {
      swal({
          title: "Succés!",
          text: 'Message envoyé avec succès',
          type: "success",

        },
        );
    });
    this.reclamtionContent = '';
    this.topicToSend = '';
  }

}
