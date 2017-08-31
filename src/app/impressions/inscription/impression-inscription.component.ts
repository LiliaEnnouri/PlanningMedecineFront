/**
 * Created by Abbes on 31/08/2017.
 */
/**
 * Created by Abbes on 25/08/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../shared/utils";
import {ImpressionService} from "../../shared/services/impression.service";
import * as FileSaver from "file-saver";
declare var swal;
declare var jQuery;
@Component({
  templateUrl: 'impression-inscription.component.html',
  styleUrls: [],

})
export class ImpressionInscriptionComponent implements OnInit {


  busy: Subscription;
  year_university: string;
  langue: number;
  codeStudent: string;
  submitted: boolean;


  constructor(private impressionService: ImpressionService) {
  }

  ngOnInit() {
    this.year_university = Utils.getCurrentUniversityYear();

    this.initSelect2();
  }

  generateAttestation() {
    this.submitted = true;

    if (!this.langue || !this.codeStudent) {
      return;
    }
    this.busy = this.impressionService.attestationInscription(this.langue, this.codeStudent)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, this.codeStudent
            + "_fr.pdf");
        },
        (error) => {

          if (error.status === 404) {
            swal({
              title: "Erreur!",
              text: "Etudiant n'existe pas",
              type: "error"
            });
            return;
          }
          if (error.status === 403) {
            swal({
              title: "Erreur!",
              text: "Etudiant n'est pas encore inscrit à cette année",
              type: "error"
            });
            return;
          }

        }
      )
  }

  private initSelect2() {
    const selectLangue = jQuery(".select-langue");
    const baseContext = this;
    selectLangue.select2();
    selectLangue.on("change", function () {
      baseContext.langue = +jQuery(this).val();
    });
  }
}
