import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../shared/services/storage.service";
import {UserService} from "../shared/services/user.service";
import {Admin} from "app/shared/models/admin";
import {ReclamationService} from "../shared/services/reclamation.service";
import {ConversationService} from "../shared/services/conversation.service";
declare let jQuery: any;
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {


  components: NavigationMain[] = [];
  admin: Admin;
  nbr_reclamations: number;
  conversationCount: number;
  readonly SUPPORT_CONVERSATION_STUDENT = 1;
  readonly SUPPORT_CONVERSATION_TEACHER = 2;

  constructor(private storageService: StorageService, private conversationService: ConversationService,
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
        icon: "icon-address-book",
        childrens: [
          {
            name: "Dossiers validés",
            url: "/student/list-valid"
          }, {
            name: "Dossiers en cours",
            url: "/student/list-current"
          }]
      },
      {
        name: "Gestion des Enseignants",
        icon: "icon-address-book",
        childrens: [
          {
            name: "Dossiers validés",
            url: "/teacher/list-valid"
          }, {
            name: "Dossiers en cours",
            url: "/teacher/list-current"
          }]
      },
      {
        name: "Inscriptions",
        icon: "icon-folder3",
        childrens: [
          {
            name: "Année universitaire",
            url: "/inscriptions/year-university"
          },
          {
            name: "Liste inscrit",
            url: "/inscriptions/list-inscrit"
          }]
      },
      {
        name: "Impressions",
        icon: "icon-printer",
        childrens: [
          {
            name: "Attestation d'inscription",
            url: "/impressions/inscription"
          },
          {
            name: "Attestation de présence",
            url: "/impressions/presence"
          }]
      },
      {
        name: "Messages",
        icon: "icon-comments",
        childrens: [
          {
            name: "Avec Etudiants",
            url: "/support/messages/student/all",
            action: this.SUPPORT_CONVERSATION_STUDENT
          },
          {
            name: "Avec Enseignants",
            url: "/support/messages/teacher/all",
            hidden: !this.checkIfAdminHasRole(1),
            action: this.SUPPORT_CONVERSATION_TEACHER
          }
        ]
      },
      {
        name: "Notifications",
        hidden: !this.checkIfAdminHasRole(1),
        icon: "icon-bubble-notification",
        childrens: [
          {
            name: "Liste des Notifications",
            url: "/notification/list",
          },
          {
            name: "Ajouter Notification",
            url: "/notification/add",
          }
        ]
      }
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
    this.conversationService.getConversationsCount().subscribe(data => {
      this.components[4].notification = data.count;
    });
    this.conversationService.getConversationsWithStudentCount().subscribe(data => {
      this.components[4].childrens[0].notification = data.count;
    });
    this.conversationService.getConversationsWithTeacherCount().subscribe(data => {
      this.components[4].childrens[1].notification = data.count;
    });
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
    console.log("url + ", url);
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

  getUserImg() {
    if (this.userService.checkIfAdminHasRole(1)) {
      return 'assets/images/avatar/admin.png';
    }
    if (this.userService.checkIfAdminHasRole(2)) {
      return 'assets/images/avatar/scholarite.png';
    }
    return 'assets/images/placeholder.jpg';
  }

  private checkIfAdminHasRole(number: number) {
    return this.userService.checkIfAdminHasRole(number);
  }

  triggerChildAction(child: ChildrenNavigation) {
    if (child.action) {
      switch (child.action) {
        case this.SUPPORT_CONVERSATION_STUDENT:
          if (this.conversationService.supportObserver) {
            this.conversationService.supportObserver.switchSupportUser('student');
          }
          break;
        case this.SUPPORT_CONVERSATION_TEACHER:
          if (this.conversationService.supportObserver) {
            this.conversationService.supportObserver.switchSupportUser('teacher');
          }
          break;
      }
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
  public notification?: number;

}
export class ChildrenNavigation {
  public name: string;
  public active?: string;
  public url: string;
  public hidden?: boolean;
  public notification?: number;
  public action?: any;
}

