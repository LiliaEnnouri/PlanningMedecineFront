import {Component, OnInit} from "@angular/core";
import {ReclamationService} from "../../shared/services/reclamation.service";
import {Subscription} from "rxjs";
declare let swal;
declare let jQuery;
@Component({
  templateUrl: 'boite-messages.component.html',
  styleUrls: [],

})
export class BoiteMessagesComponent implements OnInit {

  busy: Subscription;

  ngOnInit() {

  }

}
