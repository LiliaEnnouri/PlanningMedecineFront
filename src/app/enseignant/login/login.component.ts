import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs/Rx";
import {AuthService} from "../shared/services/auth.service";
import {StorageService} from "../shared/services/storage.service";
import {Credentials} from "../shared/models/Credentials";

declare let jQuery: any;
declare let swal: any;

@Component({
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements OnInit {

  isLoading: boolean;
  credentials: Credentials = new Credentials();
  busy: Subscription;

  ngOnInit() {
    // jQuery(".alert").alert('close');
    jQuery(".alert").hide();
  }

  constructor(private authService: AuthService,
              private userService: UserService,
              private stoarageService: StorageService,
              private router: Router) {

  }

  loginSubmit() {
    this.isLoading = true;
    jQuery(".alert").hide();
    this.credentials.password = this.credentials.password.split(' ').join('');
    this.busy = this.authService.login(this.credentials)
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          this.stoarageService.write("admin", data.admin);
          this.userService.loggedAdmin = data.admin;
          this.stoarageService.write("admin-token", data.token);
          const baseContext = this;
          console.log("success");
          swal({
              title: "Bien joué!",
              text: "Vous êtes connectés",
              type: "success"
            },
            function (isConfirm) {
              if (isConfirm) {
                baseContext.router.navigate(["/"]);
              }
            });
        },
        (error) => {
          this.isLoading = false;
          jQuery(".alert").show();
        }
      )
  }

}


