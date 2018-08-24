import {Component, OnInit} from '@angular/core';
import {Seance} from "../shared/models/Seance";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {SeanceService} from "../shared/services/seance.service";
import {Theme} from "../shared/models/Theme";
import {ThemeService} from "../shared/services/theme.service";
import {DateTime} from "date-time-js";
import {Plage_Unite} from "../shared/models/Plage_Unite";
import {PlageUniteService} from "../shared/services/plage_unite.service";


declare let jQuery: any;


@Component({
  selector: 'app-afficher-unites',
  templateUrl: './afficher-unites.component.html',
  styleUrls: ['./afficher-unites.component.css']
})
export class AfficherUnitesComponent implements OnInit {

  seances: Seance[] = [];
  uniteId: number;
  evenements: Event[] = [];
  newEvent: Event;
  theme: Theme;
  firstWeek: DateTime;
  busy: Subscription;


  constructor(private seanceService: SeanceService,
              private themeService: ThemeService,
              private plageUniteService: PlageUniteService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    // Get seances by uniteId
    this.uniteId = parseInt(this.route.snapshot.paramMap.get('uniteId'), 0);
    console.log(this.uniteId);
    const baseContext = this;
    this.seanceService.getAllSeancesByUniteWithThemeWithPlage(this.uniteId)
      .subscribe(
        (data: any) => {
          baseContext.seances = data;
          setTimeout(function () {

            console.log(baseContext.seances);

            // La date de la premiere semaine du semestre
            baseContext.firstWeek = new DateTime("2018/09/03");
            baseContext.firstWeek.format("yyyy-MM-ddTHH:mm:ss");

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
              baseContext.newEvent.start = debut.format("yyyy-MM-ddTHH:mm:ss");
              baseContext.newEvent.end = debut.hour(+seance.plage_unite.heure_fin.substr(0, 2))
                .minute(+seance.plage_unite.heure_fin.substr(3, 2))
                .format("yyyy-MM-ddTHH:mm:ss");
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


              events: baseContext.evenements
            });

          }, 20);
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
