/**
 * Created by Abbes on 25/08/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Utils} from "../../shared/utils";
import {RegistrationYearUniversity} from "../../shared/models/RegistrationYearUniversity";
import {InscriptionService} from "../../shared/services/inscription.service";
import {Subscription} from "rxjs/Subscription";
import {isUndefined} from "util";
declare var swal;
declare var jQuery;
@Component({
  templateUrl: 'inscription-year-university.component.html',
  styleUrls: [],

})
export class InscriptionYearUniversityComponent implements OnInit {


  busy: Subscription;
  submitted: boolean;
  registrationYear: RegistrationYearUniversity = new RegistrationYearUniversity();
  editAction: boolean;

  constructor(private inscriptionService: InscriptionService) {

  }

  ngOnInit() {
    this.registrationYear.year_university = Utils.getCurrentUniversityYear();
    this.getCurrentInscription();
    this.initializeDates();

  }

  openInscription() {
    this.submitted = true;
    if (!this.registrationYear.start_date || !this.registrationYear.end_date) {
      return;
    }


    this.busy = this.inscriptionService.openInscription(this.registrationYear)
      .subscribe(
        (data) => {
          swal({
            title: "Succès!",
            text: "Inscription de l'année universitaire est crée avec succées",
            confirmButtonColor: "#66BB6A",
            type: "success"
          });
        },
        (error) => {

        }
      )
  }


  private getCurrentInscription() {
    this.busy = this.inscriptionService.getCurrentInscription(this.registrationYear.year_university)
      .subscribe(
        (data) => {
          console.log(data);
          this.registrationYear = Object.keys(data).length === 0 ? new RegistrationYearUniversity() : data;
          this.editAction = Object.keys(data).length !== 0;

          if (!this.editAction) {
            this.registrationYear.year_university = Utils.getCurrentUniversityYear();
          }
          if (this.editAction) {
            this.updateChangesDates();
          }
        },
        (error) => {

        }
      )
  }

  private initializeDates() {
    const baseContext = this;
    /* Start Date */
    const startDate = jQuery('.date_open');
    startDate.daterangepicker({
      "singleDatePicker": true,
      "locale": {
        "format": "DD/MM/YYYY"
      }
    });

    startDate.on("change", function () {
      baseContext.registrationYear.start_date = Utils.convertDateServer(startDate.val());
    });

    /* End Date */
    const endDate = jQuery('.date_close');
    endDate.daterangepicker({
      "singleDatePicker": true,
      "locale": {
        "format": "DD/MM/YYYY"
      }
    });

    endDate.on("change", function () {
      baseContext.registrationYear.end_date = Utils.convertDateServer(endDate.val());
    });

  }

  private updateChangesDates() {
    /* Start Date */
    const startDate = jQuery('.date_open');
    startDate.val(Utils.convertDate(this.registrationYear.start_date)).trigger("change");
    /* End Date */
    const endDate = jQuery('.date_close');
    endDate.val(Utils.convertDate(this.registrationYear.end_date)).trigger("change");
  }
}
