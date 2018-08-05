import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Theme} from "../../shared/models/Theme";
import {ThemeService} from "../../shared/services/theme.service";


declare let swal: any;
declare let jQuery;


@Component({
  selector: 'app-list-unites',
  templateUrl: './list-unites.component.html',
  styleUrls: ['./list-unites.component.css']
})
export class ListUnitesComponent implements OnInit {


  themes: Theme[] = [];
  uniteId: number;

  busy: Subscription;


  constructor(private themeService: ThemeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.uniteId = parseInt(this.route.snapshot.paramMap.get('uniteId'), 0);
    this.getAllThemesByUnite(this.uniteId);

  }


  getAllThemesByUnite(uniteId: number) {
    const baseContext = this;
    this.themeService.getAllThemesByUnite(uniteId)
      .subscribe(
        (data: any) => {
          this.themes = data;
        }
      );
  }
}
