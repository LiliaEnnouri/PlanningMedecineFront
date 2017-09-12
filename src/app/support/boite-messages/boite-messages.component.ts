import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ConversationService} from "../../shared/services/conversation.service";
declare let swal;
declare let jQuery;
@Component({
  templateUrl: 'boite-messages.component.html',
  styleUrls: [],

})
export class BoiteMessagesComponent implements OnInit {

  busy: Subscription;
  user: string;

  constructor(private conversationServices: ConversationService, private router: Router) {

  }

  ngOnInit() {
    const baseContext = this;
    this.user = this.router.url.indexOf('teacher') > 0 ? 'teacher' : 'student';
    this.conversationServices.supportObserver = {
      switchSupportUser(user: string) {
        baseContext.user = user;
      }
    }
  }

}
