import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../shared/services/storage.service";
import {UserService} from "../shared/services/user.service";
import {Admin} from "app/shared/models/Admin";
declare let jQuery: any;
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {


  components: NavigationMain[] = [];
  admin: Admin;

  constructor(private storageService: StorageService,
              public router: Router, private userService: UserService,
              private route: ActivatedRoute) {
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
            name: "Liste",
            url: "/student/list"
          }]
      },
    ];
    this.route.queryParams.subscribe(
      params => {
        console.log(params.reload);
        if (params.reload) {
          window.location.href = "/#/";
        }

      }
    );

    this.changeActiveUrl(this.router.url);

    if (!this.storageService.read("admin-token")) {
      this.router.navigate(["/login"]);
    }

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

