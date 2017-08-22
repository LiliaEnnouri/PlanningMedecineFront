import {OnInit, Component} from "@angular/core";

import {Subscription} from "rxjs";
declare var swal;
declare var jQuery;
@Component({
  templateUrl: 'all-messages-closed.component.html',
  styleUrls: [],

})
export class AllMessagesClosedComponent implements OnInit {

  busy: Subscription;


  ngOnInit() {


  }


  constructor() {

  }

  openModalReclamation() {
    const baseContext = this;

    jQuery("#modal_form_vertical").modal();
  }

  sendEmail() {
    /*const baseContext = this;
    this.busy = this.reclamationService.sendRepMail(baseContext.selectedReclamation.id_Reclamation, baseContext.reponseMail).subscribe(data => {
      swal({
        title: "Succés!",
        text: 'Message envoyé avec succès',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
    jQuery("#modal_form_vertical").modal("hide");*/
  }



}
