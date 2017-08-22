import {OnInit, Component} from "@angular/core";
import {Reclamation} from "../../shared/models/reclamation";
import {ReclamationService} from "../../shared/services/reclamation.service";
import {Utils} from "../../shared/utils";
import {Student} from "../../shared/models/student";
import {Subscription} from "rxjs";
declare var swal;
declare var jQuery;
@Component({
  templateUrl: 'boite-messages.component.html',
  styleUrls: [],

})
export class BoiteMessagesComponent implements OnInit {

  busy: Subscription;


  ngOnInit() {


  }


  constructor(private reclamationService: ReclamationService) {

  }

  openModalReclamation(reclamation: Reclamation, student: Student) {
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
