import {OnInit, Component} from "@angular/core";
import {Reclamation} from "../../shared/models/reclamation";
import {ReclamationService} from "../../shared/services/reclamation.service";
import {Utils} from "../../shared/utils";
import {Student} from "../../shared/models/student";
import {Subscription} from "rxjs";
declare var swal;
declare var jQuery;
@Component({
  templateUrl: 'boite-reclamation.component.html',
  styleUrls: [],

})
export class BoiteReclamationComponent implements OnInit {
  reclamations: Reclamation[] = [];
  selectedReclamation: Reclamation;
  selectedReclamationOwner: Student;
  reponseMail: string;
  busy: Subscription;

  ngOnInit() {
    this.getAllReclamations();

  }

  updateStatus(index, reclamationId, status) {

    this.busy =this.reclamationService.updateStatus(reclamationId, status).subscribe(data => {
      swal({
        title: "Succés!",
        text: 'l\'etat de la réclamation est changé avec succès',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
      this.reclamations[index].status = status;
    });
  }

  constructor(private reclamationService: ReclamationService) {
    this.selectedReclamation = new Reclamation();
    this.selectedReclamationOwner = new Student();

  }

  openModalReclamation(reclamation: Reclamation, student: Student) {
    const baseContext = this;
    baseContext.selectedReclamation = reclamation;
    baseContext.selectedReclamationOwner = student;
    console.log("modal");

    jQuery("#modal_form_vertical").modal();
  }

  sendEmail() {
    const baseContext = this;
    this.busy = this.reclamationService.sendRepMail(baseContext.selectedReclamation.id_Reclamation, baseContext.reponseMail).subscribe(data => {
      swal({
        title: "Succés!",
        text: 'Message envoyé avec succès',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
    jQuery("#modal_form_vertical").modal("hide");
  }

  getAllReclamations() {
    const baseContext = this;
   this.busy = this.reclamationService.getAllReclamations()
      .subscribe(
        (reclamations) => {
          baseContext.reclamations = reclamations;
          Utils.initializeDataTables(700, 6);
        },
        (error) => {

        }
      )

  }

}
