import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Plage_Unite} from "../../shared/models/Plage_Unite";
import {TypeService} from "../../shared/services/type.service";
import {Type} from "../../shared/models/Type";
import {Subscription} from "rxjs/Subscription";
import {PlageUniteService} from "../../shared/services/plage_unite.service";


declare let swal: any;
declare let jQuery;


@Component({
  selector: 'app-configure-plage-unite',
  templateUrl: './configure-plage-unite.component.html',
  styleUrls: ['./configure-plage-unite.component.css']
})
export class ConfigurePlageUniteComponent implements OnInit {

  types: Type[] = [];
  jours: number[] = [1,2,3,4,5,6,7];
  uniteId: number;
  plages: Plage_Unite[] = [];
  busy: Subscription;
  private submitted: boolean;

  constructor(private typeService: TypeService,
              private plageUniteService: PlageUniteService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log("init");

    this.uniteId = parseInt(this.route.snapshot.paramMap.get('uniteId'), 0);
    //this.getAllThemesByUnite(this.uniteId);

    const plage_unite = new Plage_Unite();
    plage_unite.unite_id = this.uniteId;
    console.log(this.plages);
    this.plages.push(plage_unite);
    console.log(this.plages);
    const baseContext = this;
    setTimeout(function () {
      baseContext.initSelect2Jours(0);
    }, 20);

    this.getAllTypes();
  }


  onSubmit() {
    console.log("submit");
    console.log(this.plages);

    this.busy = this.plageUniteService.addPlages(this.plages)
      .subscribe(data => {
          console.log(data);
          console.log("success");
          const baseContext = this;
          swal({
              title: "Bien joué!",
              text: "Les plages ont été ajoutées",
              type: "success"
            },
            function (isConfirm) {
              if (isConfirm) {
                baseContext.router.navigate(['admin/manage-plage-unite/list-plage-unite']);
              }
            });
        },
        error => {
          console.log(error);
          swal({
            title: "Errer!",
            text: "Les plages n'ont pas été ajoutées",
            type: "error"
          });
        }
      );
  }


  private initSelect2Jours(index: number) {
    console.log("init select 2 jour");

    const selectJour = jQuery(".select-jour" + "_" + index);
    selectJour.select2();
    const baseContext = this;
    selectJour.on('change', function () {
      const pos1 = parseInt(selectJour.val(), 0);
      console.log("pos jour= ", pos1);
      baseContext.plages[index].jour = baseContext.jours[pos1];
    });
  }

  private initSelect2Types(index: number) {
    console.log("init select 2 type");

    const selectType = jQuery(".select-type" + "_" + index);
    selectType.select2();
    const baseContext = this;
    selectType.on('change', function () {
      const pos = parseInt(selectType.val(), 0);
      baseContext.plages[index].type_id = pos;
    });
  }


  private isChampFulled() {
    console.log("is champ fulled");

    for (let i = 0; i < this.plages.length; i++) {
      console.log(this.plages.length);
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
    console.log("add plage");

    this.submitted = true;
    console.log("is champ fulled:  " + this.isChampFulled());
    console.log(this.plages);
    if (!this.isChampFulled()) {
      return;
    }
    this.submitted = false;
    const plage_unite = new Plage_Unite();
    plage_unite.unite_id = this.uniteId;
    this.plages.push(plage_unite);
    console.log(this.plages);
    const baseContext = this;
    setTimeout(function () {
      console.log("init:    " + (baseContext.plages.length - 1));
      baseContext.initSelect2Types(baseContext.plages.length - 1);
      baseContext.initSelect2Jours(baseContext.plages.length - 1);
    }, 20);
    console.log(this.plages);

  }

  removePlage() {
    console.log("remove plage");

    this.plages.splice(this.plages.length - 1, 1);
  }


  getAllTypes() {
    console.log("get all types");

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

}


