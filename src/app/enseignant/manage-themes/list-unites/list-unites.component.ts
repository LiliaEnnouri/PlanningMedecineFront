import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Theme} from "../../shared/models/Theme";
import {ThemeService} from "../../shared/services/theme.service";
import {Unite} from "../../shared/models/Unite";
import {EnseignantService} from "../../shared/services/enseignant.service";


declare let swal: any;
declare let jQuery;


@Component({
  selector: 'app-list-unites',
  templateUrl: './list-unites.component.html',
  styleUrls: ['./list-unites.component.css']
})
export class ListUnitesComponent implements OnInit {

  enseignantId: number;
  themes: Theme[] = [];
  uniteId: number;
  unites: Unite[] = [];

  busy: Subscription;


  constructor(private themeService: ThemeService,
              private enseignantService: EnseignantService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('hello');
    this.enseignantId = parseInt(this.route.snapshot.paramMap.get('enseignantId'), 0);
    console.log(this.enseignantId);
    const baseContext = this;
    this.enseignantService.getUnites(this.enseignantId)
      .subscribe(
        (data: any) => {
          baseContext.unites = data;
          console.log(baseContext.unites);
        }
      );
  }


  openModalOrdre(index: number) {
    this.uniteId = this.unites[index].unite_id;
    this.getAllThemesByUnite(this.uniteId);
    jQuery("#modal_ordre").modal();

  }

  getAllThemesByUnite(uniteId: number) {
    const baseContext = this;
    this.themeService.getAllThemesByUnite(uniteId)
      .subscribe(
        (data: any) => {
          baseContext.themes = data;
          setTimeout(function () {
            baseContext.initSortable();
          }, 20);
        }
      );
  }

  private initSortable() {
    jQuery('#classement-choice').sortable();
    jQuery('#classement-choice').disableSelection();
  }


  onSubmit() {
    console.log("submit");
    const posIdsChoices = jQuery("#classement-choice").sortable("toArray");
    console.log(posIdsChoices);
    this.busy = this.themeService.definirOrdre(posIdsChoices)
      .subscribe(data => {
          console.log(data);
          console.log("success");
          const baseContext = this;
          swal({
              title: "Bien joué!",
              text: "Les thèmes ont été ordonnés",
              type: "success",
              closeOnConfirm: true
            },
            function (isConfirm) {
              if (isConfirm) {
                jQuery(".ordre").modal("hide");
                baseContext.router.navigate(['enseignant/manage-theme/list-unites/1']);
              }
            });
        },
        error => {
          console.log(error);
          swal({
            title: "Errer!",
            text: "Les thèmes n'ont pas été ordonnés",
            type: "error"
          });
        }
      );
  }

}
