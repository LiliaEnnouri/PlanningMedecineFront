import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Student} from "../../../shared/models/student";
import {UserService} from "../../../shared/services/user.service";
import {ConversationService} from "../../../shared/services/conversation.service";
import {StorageService} from "../../../shared/services/storage.service";
import {Router} from "@angular/router";

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent implements OnInit {

  emailToSend: string;
  topicToSend: string;
  busy: Subscription;
  selectedStudent: Student;

  constructor(private userService: UserService,
              private router: Router,
              private conversationservice: ConversationService,
              private storageService: StorageService) {
  }

  ngOnInit() {
  }

  sendMail() {
    const baseContext = this;
    /*
     this.studentService.sendMail(baseContext.selectedStudent.id_student, baseContext.emailToSend).subscribe(data => {

     });
     */
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

}
