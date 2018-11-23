import {Component, OnInit} from '@angular/core';
import {Seance} from "../shared/models/Seance";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {SeanceService} from "../shared/services/seance.service";
import {Theme} from "../shared/models/Theme";
import {ThemeService} from "../shared/services/theme.service";
import {DateTime} from "date-time-js";
import {PlageUniteService} from "../shared/services/plage_unite.service";
import {Enseignant} from "../shared/models/Enseignant";
import {EnseignantService} from "../shared/services/enseignant.service";
import {Ressource} from "../shared/models/Ressource";
import {RessourceService} from "../shared/services/ressource.service";


declare let jQuery: any;
declare let swal: any;


@Component({
  selector: 'app-afficher-enseignant',
  templateUrl: './afficher-enseignant.component.html',
  styleUrls: ['./afficher-enseignant.component.css']
})
export class AfficherEnseignantComponent implements OnInit {

  seances: Seance[] = [];
  enseignantId: number;
  enseignant: Enseignant = new Enseignant();
  evenements: Event[] = [];
  newEvent: Event = new Event();
  theme: Theme;
  firstWeek: DateTime;
  busy: Subscription;
  seance: Seance = new Seance();
  ressources: Ressource[];
  submitted: boolean;


  constructor(private seanceService: SeanceService,
              private themeService: ThemeService,
              private plageUniteService: PlageUniteService,
              private enseignantService: EnseignantService,
              private ressourceService: RessourceService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    // Get seances by enseignantId
    this.enseignantId = parseInt(this.route.snapshot.paramMap.get('enseignantId'), 0);
    this.busy = this.enseignantService.getEnseignantById(this.enseignantId).subscribe(
      (data: any) => {
        this.enseignant = data;
      });
    const baseContext = this;
    this.seanceService.getAllSeancesByEnseignant(this.enseignantId)
      .subscribe(
        (data: any) => {
          baseContext.seances = data;
          setTimeout(function () {

            console.log(baseContext.seances);

            // La date de la premiere semaine du semestre
            baseContext.firstWeek = new DateTime("2018/09/03");
            baseContext.firstWeek.format("yyyy-MM-ddTHH:mm");

            for (let i = 0; i < baseContext.seances.length; i++) {
              console.log("boucle");
              const seance = baseContext.seances[i];
              baseContext.newEvent = new Event();

              // Le numero du jour de Seance
              const days = (seance.semaine - 1) * 7 + seance.plage_unite.jour - 1;
              const debut = baseContext.firstWeek.copy();
              debut.add(days, 'day').hour(+seance.plage_unite.heure_debut.substr(0, 2))
                .minute(+seance.plage_unite.heure_debut
                  .substr(3, 2));

              baseContext.newEvent.id = seance.seance_id;
              baseContext.newEvent.title = seance.theme.code + ": " + seance.theme.contenu;
              baseContext.newEvent.allDay = false;
              baseContext.newEvent.start = debut.format("yyyy-MM-ddTHH:mm");
              baseContext.newEvent.end = debut.hour(+seance.plage_unite.heure_fin.substr(0, 2))
                .minute(+seance.plage_unite.heure_fin.substr(3, 2))
                .format("yyyy-MM-ddTHH:mm");
              baseContext.evenements.push(baseContext.newEvent);
            }

            console.log(baseContext.evenements);


            // Agenda view
            jQuery('.fullcalendar-agenda').fullCalendar({
              header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
              },
              defaultView: 'month',
              height: "auto",
              editable: false,
              hiddenDays: [0],
              minTime: "08:00",
              maxTime: "19:00",
              nowIndicator: true,
              slotDuration: "01:00:00",
              validRange: {
                start: '2018-08-03',
                end: '2019-06-22'
              },
              locale: "fr",


              events: baseContext.evenements,

              eventClick: function (calEvent, jsEvent, view) {
                console.log(calEvent.id);
                baseContext.openModalDetail(calEvent.id);
                console.log(calEvent);
                console.log(baseContext.newEvent);
                console.log(baseContext.seance);
              }

            });

          }, 20);
        }
      );
  }

  openModalDetail(seanceId: number) {

    const indexSeance = this.seances.map(
      seance => {
        return seance.seance_id
      }
    ).indexOf(seanceId);

    const indexEvent = this.evenements.map(
      event => {
        return event.id
      }
    ).indexOf(seanceId);

    this.newEvent = this.evenements[indexEvent];
    this.seance = this.seances[indexSeance];
    this.ressourceService.getAllRessourcesByTheme(this.seance.theme_id)
      .subscribe(
        (data: any) => {
          this.ressources = data;
        }
      );

    jQuery("#modal_detail").modal();

  }

  AjouterRessources(themeId) {
    jQuery("#modal_ajouter_ressources").modal();
  }


  private isChampFulled() {
    console.log("is champ fulled");

    for (let i = 0; i < this.ressources.length; i++) {
      console.log(this.ressources.length);
      if (!this.ressources[i].path ||
        !this.ressources[i].libelle) {
        return false;
      }
    }
    return true;
  }


  addRessource() {
    this.submitted = true;
    console.log("is champ fulled:  " + this.isChampFulled());
    console.log(this.ressources);
    if (!this.isChampFulled()) {
      return;
    }
    this.submitted = false;

    const ressource = new Ressource();
    ressource.theme_id = this.seance.theme_id;
    this.ressources.push(ressource);
    console.log(this.ressources);
  }

  removeRessource() {
    console.log("remove ressource");

    this.ressources.splice(this.ressources.length - 1, 1);
  }

  onSubmit() {
    console.log("submit");
    console.log(this.ressources);

    this.busy = this.ressourceService.editRessourcesTheme(this.ressources, this.seance.theme_id)
      .subscribe(data => {
          console.log(data);
          console.log("success");
          const baseContext = this;
          swal({
              title: "Bien joué!",
              text: "Les ressources ont été ajoutées",
              type: "success"
            },
            function (isConfirm) {
              if (isConfirm) {
                baseContext.router.navigate(['enseignant/afficher-enseignant']);
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


}

export class Event {

  id: number;
  title: string;
  allDay?: boolean;
  start?: string;
  end?: string;
  url?: string;
  className?: string;
  editable?: boolean;
  startEditable?: boolean;
  durationEditable?: boolean;
  resourceEditable?: boolean;
  redering?: string;
  overlap?: boolean;
  constrtaint?: string;
  source?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;

}
