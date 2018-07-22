import {Component, OnInit} from '@angular/core';
import {Niveau} from "../../shared/models/Niveau";
import {ActivatedRoute, Router} from "@angular/router";
import {Unite} from "../../shared/models/Unite";
import {Utils} from "../../shared/utils";
import {UniteService} from "../../shared/services/unite.service";
import {SharedService} from "../../shared/services/shared.service";


declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-list-plage-unite',
  templateUrl: './list-plage-unite.component.html',
  styleUrls: ['./list-plage-unite.component.css']
})
export class ListPlageUniteComponent implements OnInit {
  niveaux: Niveau[] = [];
  selectedNiveau: number;
  unites: Unite[] = [];

  constructor(private sharedService: SharedService,
              private uniteService: UniteService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllNiveaux();

  }

  getAllNiveaux() {
    const baseContext = this;
    this.sharedService.getNiveaux()
      .subscribe(
        (data: any) => {
          this.niveaux = data;
          setTimeout(function () {
            baseContext.initSelect2();
          }, 20);


        }
      );
  }

  getUnitesByNiveau(niveauId) {
    this.uniteService.getAllUnitesByNiveau(niveauId)
      .subscribe(
        (data: any) => {
          this.unites = data;
          Utils.initializeDataTables(20, 5);
        }
      );
  }

  private initSelect2() {
    const selectNiveau = jQuery(".select-niveau");
    selectNiveau.select2();
    const baseContext = this;
    selectNiveau.on('change', function () {
      const pos = parseInt(selectNiveau.val(), 0);
      baseContext.selectedNiveau = pos;
      baseContext.getUnitesByNiveau(pos);
    });

  }
}
