import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Unite} from "../../shared/models/Unite";
import {Theme} from "../../shared/models/Theme";
import {ThemeService} from "../../shared/services/theme.service";
import {Plage_Unite} from "../../shared/models/Plage_Unite";
import {TypeService} from "../../shared/services/type.service";
import {Type} from "../../shared/models/Type";
import {Subscription} from "rxjs/Subscription";
import {Study} from "../../../shared/models/study";


declare let swal: any;
declare let jQuery;


@Component({
  selector: 'app-configure-plage-unite',
  templateUrl: './configure-plage-unite.component.html',
  styleUrls: ['./configure-plage-unite.component.css']
})
export class ConfigurePlageUniteComponent implements OnInit {

  themes: Theme[] = [];
  types: Type[] = [];
  jours: String[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  selectedTheme: number;
  selectedJour: number;
  selectedType: number;
  uniteId: number;
  plages: Plage_Unite[] = [];
  busy: Subscription;
  private submitted: boolean;

  constructor(private themeService: ThemeService,
              private typeService: TypeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.uniteId = parseInt(this.route.snapshot.paramMap.get('uniteId'), 0);
    //this.getAllThemesByUnite(this.uniteId);


    const plage_unite = new Plage_Unite();
    plage_unite.unite_id = this.uniteId;
    this.plages.push(plage_unite);
    const baseContext = this;
    setTimeout(function () {
      baseContext.initSelect2Jours(0);
    }, 20);

    this.getAllTypes();

  }

  getAllThemesByUnite(uniteId: number) {
    const baseContext = this;
    this.themeService.getAllThemesByUnite(uniteId)
      .subscribe(
        (data: any) => {
          this.themes = data;
          setTimeout(function () {
            baseContext.initSelect2Themes();
          }, 20);
        }
      );
  }

  getAllTypes() {
    const baseContext = this;
    this.typeService.getAllTypes()
      .subscribe(
        (data: any) => {
          this.types = data;
          setTimeout(function () {
            baseContext.initSelect2Types(0);
          }, 20);
        }
      );
  }

  private initSelect2Themes() {
    const selectTheme = jQuery(".select-theme");
    selectTheme.select2();
    const baseContext = this;
    selectTheme.on('change', function () {
      const pos = parseInt(selectTheme.val(), 0);
      baseContext.selectedTheme = pos;
    });
  }

  private initSelect2Jours(index: number) {
    const selectJour = jQuery(".select-jour" + "_" + index);
    selectJour.select2();
    const baseContext = this;
    selectJour.on('change', function () {
      const pos = parseInt(selectJour.val(), 0);
      baseContext.selectedJour = pos;
      baseContext.plages[index].jour = selectJour;
    });
  }

  private initSelect2Types(index: number) {
    const selectType = jQuery(".select-type" + "_" + index);
    selectType.select2();
    const baseContext = this;
    selectType.on('change', function () {
      const pos = parseInt(selectType.val(), 0);
      baseContext.selectedType = pos;
      baseContext.plages[index].type_id = selectType;
    });
  }


  private isChampFulled() {
    for (let i = 0; i < this.plages.length; i++) {
      if (!this.plages[i].jour ||
        !this.plages[i].type_id ||
        !this.plages[i].heure_debut ||
        !this.plages[i].heure_fin) {
        return false;
      }
    }
    return true;
  }

  addPlage() {
    this.submitted = true;
    console.log(this.isChampFulled());
    if (!this.isChampFulled()) {
      return;
    }
    this.submitted = false;
    const plage_unite = new Plage_Unite();
    plage_unite.unite_id = this.uniteId;
    this.plages.push(plage_unite);
    const baseContext = this;
    setTimeout(function () {
      baseContext.initSelect2Types(this.plages.length - 1);
      baseContext.initSelect2Jours(this.plages.length - 1);
    }, 20);
  }

  removePlage() {
    this.plages.splice(this.plages.length - 1, 1);
  }
}
