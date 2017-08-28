import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {StorageService} from "app/shared/services/storage.service";
import {AuthService} from "app/shared/services/auth.service";
import {Credentials} from "app/shared/models/credentials";
import {AdminService} from "../shared/services/admin.service";
import {UserService} from "../shared/services/user.service";

declare let jQuery: any;
@Component({
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements OnInit {

  isLoading: boolean;
  credentials: Credentials = new Credentials();

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
    this.authService.login(this.credentials)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.stoarageService.write("admin", data.admin);
          this.userService.loggedAdmin = data.admin;
          this.stoarageService.write("admin-token", data.token);
          this.router.navigate(["/"], {queryParams: {reload: true}});

        },
        (error) => {
          this.isLoading = false;
          jQuery(".alert").show();
        }
      )
  }

}


