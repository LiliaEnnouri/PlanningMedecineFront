import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../shared/services/storage.service";
import {UserService} from "../shared/services/user.service";
import {Admin} from "app/shared/models/Admin";
import {ReclamationService} from "../shared/services/reclamation.service";
declare let jQuery: any;
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {


  components: NavigationMain[] = [];
  admin: Admin;
  nbr_reclamations: number;

  constructor(private storageService: StorageService,
              public router: Router, private userService: UserService,
              private route: ActivatedRoute, private reclamationService: ReclamationService) {
    this.admin = this.userService.loggedAdmin;
    if (!this.admin) {
      this.admin = new Admin();
    }
    this.userService.getLoggedAdmin().subscribe(data => {
      this.admin = this.userService.loggedAdmin = data.admin;
      this.storageService.write("admin", data.admin);
    }, error => {
      this.storageService.removeAll();
      this.router.navigateByUrl('login');
    });
  }

  ngOnInit() {
    this.components = [
      {
        name: "Gestion des Etudiants",
        icon: "icon-pencil3",
        childrens: [
          {
            name: "Liste des dossiers",
            url: "/student/list"
          }]
      },
      {
        name: "Inscriptions",
        icon: "icon-pencil3",
        childrens: [
          {
            name: "Année universitaire",
            url: "/inscriptions/year-university"
          },
          {
            name: "Liste inscrit",
            url: "/inscriptions/list-inscrit"
          }]
      }, /*
       {
       name: "Assistance",
       icon: "icon-lifebuoy",
       childrens: [
       {
       name: "Boite des réclamations",
       url: "/support/boitereclamation",
       },

       ]
       },*/
      {
        name: "Messages",
        icon: "icon-comments",
        url: "/support/messages/all"
      },
    ];

    this.route.queryParams.subscribe(
      params => {
        console.log(params.reload);
        if (params.reload) {
          window.location.href = "/";
        }

      }
    );

    this.changeActiveUrl(this.router.url);

    if (!this.storageService.read("admin-token")) {
      this.router.navigate(["/login"]);
    }
    this.getNumberReclamations();

  }

  changeActiveUrl(url: string) {
    this.components.forEach(
      component => {
        component.active = "";
        if (url.indexOf(component.url) !== -1) {
          component.active = "active";
        }
        if (component.childrens) {
          component.childrens.forEach(
            child => {
              child.active = "";
              if (url.indexOf(child.url) !== -1) {
                child.active = "active";
              }
            }
          )
        }
      }
    )
  }

  logout() {
    this.storageService.removeAll();
    this.router.navigateByUrl("/login");
  }

  goUrl(url: string) {
    if (url) {
      this.router.navigate([url]);
    }
  }

  getNumberReclamations() {
    const baseContext = this;
    this.reclamationService.getNumberOfReclamations()
      .subscribe(
        (reclamations) => {
          baseContext.nbr_reclamations = reclamations;
        },
        (error) => {

        }
      )

  }
}
export class NavigationMain {
  public name: string;
  public icon: string;
  public active?: string;
  public childrens?: ChildrenNavigation[] = [];
  public url?: string;
  public hidden?: boolean;
}
export class ChildrenNavigation {
  public name: string;
  public active?: string;
  public url: string;
  public hidden?: boolean;
}

