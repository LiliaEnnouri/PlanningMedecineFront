import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {DateTime} from "date-time-js";
import {Seance} from "../shared/models/Seance";
import {Enseignant} from "../shared/models/Enseignant";
import {Theme} from "../shared/models/Theme";
import {PlageUniteService} from "../shared/services/plage_unite.service";
import {SeanceService} from "../shared/services/seance.service";
import {ThemeService} from "../shared/services/theme.service";
import {NiveauService} from "../shared/services/niveau.service";
import {Niveau} from "../shared/models/Niveau";


declare let jQuery: any;


@Component({
  selector: 'app-afficher-enseignant',
  templateUrl: './afficher-niveau.component.html',
  styleUrls: ['./afficher-niveau.component.css']
})
export class AfficherNiveauComponent implements OnInit {

  seances: Seance[] = [];
  niveauId: number;
  niveau: Niveau = new Niveau();
  evenements: Event[] = [];
  newEvent: Event = new Event();
  theme: Theme;
  firstWeek: DateTime;
  busy: Subscription;
  seance: Seance = new Seance();


  constructor(private seanceService: SeanceService,
              private themeService: ThemeService,
              private niveauService: NiveauService,
              private plageUniteService: PlageUniteService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    // Get seances by enseignantId
    this.niveauId = parseInt(this.route.snapshot.paramMap.get('niveauId'), 0);
    this.busy = this.niveauService.getNiveauById(this.niveauId).subscribe(
      (data: any) => {
        this.niveau = data;
      });
    const baseContext = this;
    this.seanceService.getAllSeancesByNiveau(this.niveauId)
      .subscribe(
        (data: any) => {
          baseContext.seances = data;
          setTimeout(function () {

            console.log(baseContext.seances);

            // La date de la premiere semaine du semestre
            baseContext.firstWeek = new DateTime("2018/08/27");
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
    jQuery("#modal_detail").modal();

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
