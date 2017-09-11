import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
declare let swal;
declare let jQuery;
@Component({
  templateUrl: 'boite-messages.component.html',
  styleUrls: [],

})
export class BoiteMessagesComponent implements OnInit {

  busy: Subscription;
  user: string;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    const baseContext = this;
    this.user = this.router.url.indexOf('teacher') > 0 ? 'teacher' : 'student';
  }

}
