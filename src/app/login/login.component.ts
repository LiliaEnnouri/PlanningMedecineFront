import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {StorageService} from "app/shared/services/storage.service";
import {AuthService} from "app/shared/services/auth.service";
import {Credentials} from "app/shared/models/credentials";
import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs/Rx";

declare let jQuery: any;

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
    /*
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


        },
        (error) => {
          this.isLoading = false;
          jQuery(".alert").show();
        }
      )*/
    const baseContext = this;
    setTimeout(function () {
      baseContext.router.navigate(["/"], {queryParams: {reload: true}});
    }, 1000);
  }

}


